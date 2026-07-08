import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { AIChatbot } from '@/components/AIChatbot';
import { supabase } from '@/integrations/supabase/client';
import { Session } from '@supabase/supabase-js';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';
import { z } from 'zod';
import { Loader2, Upload, X, Calendar, MapPin, BookOpen, Image as ImageIcon } from 'lucide-react';
import { Switch } from '@/components/ui/switch';

const journalSchema = z.object({
  title: z.string().trim().min(1, 'Title is required').max(200, 'Title must be less than 200 characters'),
  content: z.string().trim().min(10, 'Content must be at least 10 characters').max(5000, 'Content must be less than 5000 characters'),
  location: z.string().trim().max(200, 'Location must be less than 200 characters').optional(),
  visit_date: z.string().optional(),
});

export default function Journal() {
  const navigate = useNavigate();
  const [session, setSession] = useState<Session | null>(null);
  const [language, setLanguage] = useState<'en' | 'ar'>('en');
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [location, setLocation] = useState('');
  const [visitDate, setVisitDate] = useState('');
  const [photos, setPhotos] = useState<File[]>([]);
  const [photoPreview, setPhotoPreview] = useState<string[]>([]);
  const [journals, setJournals] = useState<any[]>([]);
  const [errors, setErrors] = useState<{ title?: string; content?: string; location?: string }>({});
  const [isPublic, setIsPublic] = useState(false);

  const text = {
    en: {
      title: 'Travel Journal',
      subtitle: 'Document your heritage journey',
      createNew: 'Create New Entry',
      journalTitle: 'Title',
      journalContent: 'Content',
      journalLocation: 'Location',
      visitDate: 'Visit Date',
      photos: 'Photos',
      uploadPhotos: 'Upload Photos',
      makePublic: 'Make this journal public',
      submit: 'Submit',
      submitting: 'Submitting...',
      loginPrompt: 'Login to Create Journals',
      publicJournals: 'Public Journals',
      myJournals: 'My Journals',
      by: 'by',
      remove: 'Remove',
      maxPhotos: 'Maximum 5 photos',
    },
    ar: {
      title: 'مجلة السفر',
      subtitle: 'وثق رحلتك التراثية',
      createNew: 'إنشاء إدخال جديد',
      journalTitle: 'العنوان',
      journalContent: 'المحتوى',
      journalLocation: 'الموقع',
      visitDate: 'تاريخ الزيارة',
      photos: 'الصور',
      uploadPhotos: 'تحميل الصور',
      makePublic: 'اجعل هذه المجلة عامة',
      submit: 'إرسال',
      submitting: 'جارٍ الإرسال...',
      loginPrompt: 'تسجيل الدخول لإنشاء المجلات',
      publicJournals: 'المجلات العامة',
      myJournals: 'مجلاتي',
      by: 'بواسطة',
      remove: 'إزالة',
      maxPhotos: 'الحد الأقصى 5 صور',
    }
  };

  const isRTL = language === 'ar';

  useEffect(() => {
    // Check auth
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    // Load journals regardless of auth state (for public journals)
    loadJournals();

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    loadJournals();
  }, [session]);

  const loadJournals = async () => {
    const { data, error } = await supabase
      .from('journals')
      .select(`
        *,
        journal_photos(*),
        profiles(username)
      `)
      .or(session?.user?.id ? `user_id.eq.${session.user.id},is_public.eq.true` : `is_public.eq.true`)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error loading journals:', error);
      return;
    }

    // Resolve signed URLs for photos in the private bucket
    const resolved = await Promise.all(
      (data || []).map(async (journal: any) => {
        if (!journal.journal_photos?.length) return journal;
        const photos = await Promise.all(
          journal.journal_photos.map(async (photo: any) => {
            if (!photo.photo_url) return photo;
            if (photo.photo_url.startsWith('http')) return photo;
            const { data: signed } = await supabase.storage
              .from('journal-photos')
              .createSignedUrl(photo.photo_url, 3600);
            return { ...photo, photo_url: signed?.signedUrl || photo.photo_url };
          })
        );
        return { ...journal, journal_photos: photos };
      })
    );
    setJournals(resolved);
  };

  const handlePhotoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newFiles = Array.from(files);
    const totalFiles = photos.length + newFiles.length;

    if (totalFiles > 5) {
      toast.error('You can upload a maximum of 5 photos per journal');
      return;
    }

    // Validate file sizes (max 5MB each)
    const invalidFiles = newFiles.filter(file => file.size > 5 * 1024 * 1024);
    if (invalidFiles.length > 0) {
      toast.error('Each photo must be less than 5MB');
      return;
    }

    setPhotos([...photos, ...newFiles]);

    // Create preview URLs
    const newPreviews = newFiles.map(file => URL.createObjectURL(file));
    setPhotoPreview([...photoPreview, ...newPreviews]);
  };

  const removePhoto = (index: number) => {
    const newPhotos = photos.filter((_, i) => i !== index);
    const newPreviews = photoPreview.filter((_, i) => i !== index);
    
    // Revoke the URL to free memory
    URL.revokeObjectURL(photoPreview[index]);
    
    setPhotos(newPhotos);
    setPhotoPreview(newPreviews);
  };

  const validateForm = () => {
    const newErrors: { title?: string; content?: string; location?: string } = {};
    
    try {
      journalSchema.parse({
        title,
        content,
        location: location || undefined,
        visit_date: visitDate || undefined,
      });
    } catch (err) {
      if (err instanceof z.ZodError) {
        err.errors.forEach((error) => {
          const field = error.path[0] as string;
          newErrors[field as keyof typeof newErrors] = error.message;
        });
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const uploadPhotos = async (journalId: string, userId: string) => {
    const uploadedUrls: string[] = [];

    for (const photo of photos) {
      const fileExt = photo.name.split('.').pop();
      const fileName = `${userId}/${journalId}/${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('journal-photos')
        .upload(fileName, photo);

      if (uploadError) {
        console.error('Error uploading photo:', uploadError);
        continue;
      }

      const { data: { publicUrl } } = supabase.storage
        .from('journal-photos')
        .getPublicUrl(fileName);

      uploadedUrls.push(publicUrl);

      // Save photo path to database (not public URL)
      await supabase
        .from('journal_photos')
        .insert({
          journal_id: journalId,
          photo_url: fileName, // Store path, not public URL
        });
    }

    return uploadedUrls;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    if (!session?.user) {
      toast.error('You must be logged in to create a journal');
      return;
    }

    setLoading(true);
    setUploading(photos.length > 0);

    try {
      // Create journal entry
      const { data: journal, error: journalError } = await supabase
        .from('journals')
        .insert({
          user_id: session.user.id,
          title: title.trim(),
          content: content.trim(),
          location: location.trim() || null,
          visit_date: visitDate || null,
          is_public: isPublic,
        })
        .select()
        .single();

      if (journalError) throw journalError;

      // Upload photos if any
      if (photos.length > 0 && journal) {
        await uploadPhotos(journal.id, session.user.id);
      }

      toast.success('Journal entry created successfully!');
      
      // Reset form
      setTitle('');
      setContent('');
      setLocation('');
      setVisitDate('');
      setPhotos([]);
      setPhotoPreview([]);
      setIsPublic(false);
      
      // Reload journals
      loadJournals();
    } catch (error: any) {
      console.error('Error creating journal:', error);
      toast.error(error.message || 'Failed to create journal entry');
    } finally {
      setLoading(false);
      setUploading(false);
    }
  };

  if (!session) {
    return (
      <>
        <Navigation language={language} onLanguageChange={setLanguage} />
        <div className={`min-h-screen bg-gradient-to-b from-background to-muted/30 pt-24 pb-12 ${isRTL ? 'rtl' : ''}`}>
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="mb-8">
            <h1 className="text-4xl font-bold gradient-text mb-2">{text[language].title}</h1>
            <p className="text-muted-foreground">{text[language].subtitle}</p>
          </div>
          
          <div className="space-y-4">
            <h2 className="text-xl font-bold">{text[language].publicJournals}</h2>
            {journals.length === 0 ? (
              <Card className="p-6 text-center text-muted-foreground">
                <BookOpen className="w-12 h-12 mx-auto mb-2 text-muted-foreground/50" />
                <p>{language === 'en' ? 'No public journal entries yet' : 'لا توجد مدخلات عامة للمجلة بعد'}</p>
              </Card>
            ) : (
              journals.map((journal) => (
                <Card key={journal.id} className="p-4 hover:shadow-lg transition-shadow">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold">{journal.title}</h3>
                    <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">{language === 'en' ? 'Public' : 'عام'}</span>
                  </div>
                  {journal.location && (
                    <p className="text-sm text-muted-foreground flex items-center gap-1 mb-2">
                      <MapPin className="w-3 h-3" />
                      {journal.location}
                    </p>
                  )}
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                    {journal.content}
                  </p>
                  {journal.journal_photos && journal.journal_photos.length > 0 && (
                    <div className="flex gap-1 mt-2">
                      {journal.journal_photos.slice(0, 3).map((photo: any, idx: number) => (
                        <img
                          key={idx}
                          src={photo.photo_url}
                          alt="Journal"
                          className="w-12 h-12 object-cover rounded"
                        />
                      ))}
                      {journal.journal_photos.length > 3 && (
                        <div className="w-12 h-12 bg-muted rounded flex items-center justify-center text-xs">
                          +{journal.journal_photos.length - 3}
                        </div>
                      )}
                    </div>
                  )}
                  <div className="flex items-center justify-between mt-2">
                    <p className="text-xs text-muted-foreground">
                      {text[language].by} {journal.profiles?.username || (language === 'en' ? 'Anonymous' : 'مجهول')}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(journal.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </Card>
              ))
            )}
            <div className="text-center mt-8">
              <Button onClick={() => navigate('/auth')} className="btn-hero">
                {text[language].loginPrompt}
              </Button>
            </div>
          </div>
        </div>
      </div>
      </>
    );
  }

  return (
    <>
      <Navigation language={language} onLanguageChange={setLanguage} />
      <div className={`min-h-screen bg-gradient-to-b from-background to-muted/30 pt-24 pb-12 ${isRTL ? 'rtl' : ''}`}>
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold gradient-text mb-2">{text[language].title}</h1>
          <p className="text-muted-foreground">{language === 'en' ? 'Share your travel experiences and discover others\' journeys' : 'شارك تجاربك السياحية واكتشف رحلات الآخرين'}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Create Journal Form */}
          <Card className="lg:col-span-2 h-fit">
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <h2 className="text-2xl font-bold gradient-text">{text[language].createNew}</h2>
              
              <div className="space-y-2">
                <Label htmlFor="title">{text[language].journalTitle} *</Label>
                <Input
                  id="title"
                  placeholder={language === 'en' ? "e.g., A Day at Al Fahidi" : "مثال: يوم في الفهيدي"}
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                    setErrors({ ...errors, title: undefined });
                  }}
                  disabled={loading}
                />
                {errors.title && <p className="text-sm text-destructive">{errors.title}</p>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="location">{text[language].journalLocation}</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="location"
                      placeholder={language === 'en' ? "Dubai, UAE" : "دبي، الإمارات"}
                      value={location}
                      onChange={(e) => {
                        setLocation(e.target.value);
                        setErrors({ ...errors, location: undefined });
                      }}
                      className="pl-10"
                      disabled={loading}
                    />
                  </div>
                  {errors.location && <p className="text-sm text-destructive">{errors.location}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="visitDate">{text[language].visitDate}</Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="visitDate"
                      type="date"
                      value={visitDate}
                      onChange={(e) => setVisitDate(e.target.value)}
                      className="pl-10"
                      disabled={loading}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">{text[language].journalContent} *</Label>
                <Textarea
                  id="content"
                  placeholder={language === 'en' ? "Share your story, what you saw, how you felt..." : "شارك قصتك، ما رأيته، كيف شعرت..."}
                  value={content}
                  onChange={(e) => {
                    setContent(e.target.value);
                    setErrors({ ...errors, content: undefined });
                  }}
                  rows={8}
                  disabled={loading}
                />
                {errors.content && <p className="text-sm text-destructive">{errors.content}</p>}
              </div>

              <div className="space-y-2">
                <Label>{text[language].photos} ({text[language].maxPhotos})</Label>
                <div className="flex flex-wrap gap-4">
                  {photoPreview.map((preview, index) => (
                    <div key={index} className="relative w-24 h-24">
                      <img
                        src={preview}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-full object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => removePhoto(index)}
                        className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-1"
                        disabled={loading}
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  
                  {photos.length < 5 && (
                    <label className="w-24 h-24 border-2 border-dashed border-border rounded-lg flex items-center justify-center cursor-pointer hover:bg-muted transition-colors">
                      <div className="text-center">
                        <ImageIcon className="w-6 h-6 mx-auto text-muted-foreground mb-1" />
                        <span className="text-xs text-muted-foreground">{language === 'en' ? 'Add' : 'إضافة'}</span>
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handlePhotoSelect}
                        className="hidden"
                        disabled={loading}
                      />
                    </label>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between py-4 border-t border-b">
                <Label htmlFor="is-public" className="cursor-pointer">
                  {text[language].makePublic}
                </Label>
                <Switch
                  id="is-public"
                  checked={isPublic}
                  onCheckedChange={setIsPublic}
                  disabled={loading}
                />
              </div>

              <Button type="submit" className="w-full btn-hero" disabled={loading}>
                {uploading ? (
                  <>
                    <Upload className="mr-2 h-4 w-4 animate-pulse" />
                    {language === 'en' ? 'Uploading photos...' : 'تحميل الصور...'}
                  </>
                ) : loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {language === 'en' ? 'Creating...' : 'جارٍ الإنشاء...'}
                  </>
                ) : (
                  text[language].submit
                )}
              </Button>
            </form>
          </Card>

          {/* Recent Journals */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold">{language === 'en' ? 'Recent Entries' : 'الإدخالات الأخيرة'}</h2>
            {journals.length === 0 ? (
              <Card className="p-6 text-center text-muted-foreground">
                <BookOpen className="w-12 h-12 mx-auto mb-2 text-muted-foreground/50" />
                <p>{language === 'en' ? 'No journal entries yet' : 'لا توجد مدخلات للمجلة بعد'}</p>
                <p className="text-sm">{language === 'en' ? 'Create your first entry to get started!' : 'أنشئ مدخلك الأول للبدء!'}</p>
              </Card>
            ) : (
              journals.slice(0, 5).map((journal) => (
                <Card key={journal.id} className="p-4 hover:shadow-lg transition-shadow">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold">{journal.title}</h3>
                    {journal.is_public && (
                      <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">{language === 'en' ? 'Public' : 'عام'}</span>
                    )}
                  </div>
                  {journal.location && (
                    <p className="text-sm text-muted-foreground flex items-center gap-1 mb-2">
                      <MapPin className="w-3 h-3" />
                      {journal.location}
                    </p>
                  )}
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                    {journal.content}
                  </p>
                  {journal.journal_photos && journal.journal_photos.length > 0 && (
                    <div className="flex gap-1 mt-2">
                      {journal.journal_photos.slice(0, 3).map((photo: any, idx: number) => {
                        const photoUrl = photo.photo_url.startsWith('http') 
                          ? photo.photo_url 
                          : `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/journal-photos/${photo.photo_url}`;
                        return (
                          <img
                            key={idx}
                            src={photoUrl}
                            alt="Journal"
                            className="w-12 h-12 object-cover rounded"
                          />
                        );
                      })}
                      {journal.journal_photos.length > 3 && (
                        <div className="w-12 h-12 bg-muted rounded flex items-center justify-center text-xs">
                          +{journal.journal_photos.length - 3}
                        </div>
                      )}
                    </div>
                  )}
                  <div className="flex items-center justify-between mt-2">
                    <p className="text-xs text-muted-foreground">
                      {text[language].by} {journal.profiles?.username || (language === 'en' ? 'Anonymous' : 'مجهول')}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(journal.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>
      
      <AIChatbot language={language} />
      <Footer />
    </div>
    </>
  );
}
