import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navigation } from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { Session } from '@supabase/supabase-js';
import { toast } from 'sonner';
import { Star, Calendar } from 'lucide-react';
import { format } from 'date-fns';

interface Review {
  id: string;
  destination: string;
  rating: number;
  comment: string;
  visit_date: string | null;
  created_at: string;
  user_id: string;
  profiles?: {
    username: string;
  };
}

export default function Reviews() {
  const navigate = useNavigate();
  const [session, setSession] = useState<Session | null>(null);
  const [language, setLanguage] = useState<'en' | 'ar'>('en');
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [destination, setDestination] = useState('');
  const [rating, setRating] = useState('5');
  const [comment, setComment] = useState('');
  const [visitDate, setVisitDate] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const isRTL = language === 'ar';

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    loadReviews();
  }, []);

  const loadReviews = async () => {
    try {
      const { data, error } = await supabase
        .from('reviews')
        .select(`
          *,
          profiles(username)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setReviews(data || []);
    } catch (error) {
      console.error('Error loading reviews:', error);
      toast.error('Failed to load reviews');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!session) {
      navigate('/auth');
      return;
    }

    if (!destination || !comment) {
      toast.error('Please fill in all required fields');
      return;
    }

    setSubmitting(true);
    try {
      const { error } = await supabase.from('reviews').insert({
        user_id: session.user.id,
        destination,
        rating: parseInt(rating),
        comment,
        visit_date: visitDate || null,
      });

      if (error) throw error;

      toast.success('Review submitted successfully!');
      setDestination('');
      setRating('5');
      setComment('');
      setVisitDate('');
      loadReviews();
    } catch (error) {
      console.error('Error submitting review:', error);
      toast.error('Failed to submit review');
    } finally {
      setSubmitting(false);
    }
  };

  const text = {
    en: {
      title: 'Reviews',
      addReview: 'Add Your Review',
      destination: 'Destination',
      rating: 'Rating',
      comment: 'Your Review',
      visitDate: 'Visit Date (Optional)',
      submit: 'Submit Review',
      loginToReview: 'Login to Add Review',
      noReviews: 'No reviews yet. Be the first to share your experience!',
      stars: 'stars',
    },
    ar: {
      title: 'التقييمات',
      addReview: 'أضف تقييمك',
      destination: 'الوجهة',
      rating: 'التقييم',
      comment: 'تقييمك',
      visitDate: 'تاريخ الزيارة (اختياري)',
      submit: 'إرسال التقييم',
      loginToReview: 'تسجيل الدخول لإضافة تقييم',
      noReviews: 'لا توجد تقييمات بعد. كن أول من يشارك تجربته!',
      stars: 'نجوم',
    },
  };

  return (
    <div className={`min-h-screen bg-background ${isRTL ? 'rtl' : ''}`}>
      <Navigation language={language} onLanguageChange={setLanguage} />
      
      <main className="container mx-auto px-6 pt-32 pb-16">
        <h1 className="text-4xl font-bold gradient-text mb-8 text-center">
          {text[language].title}
        </h1>

        {/* Add Review Form - Only for logged in users */}
        {session ? (
          <Card className="mb-12 max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>{text[language].addReview}</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="destination">{text[language].destination}</Label>
                  <Input
                    id="destination"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    placeholder="e.g., Burj Khalifa"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="rating">{text[language].rating}</Label>
                  <Select value={rating} onValueChange={setRating}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {[5, 4, 3, 2, 1].map((num) => (
                        <SelectItem key={num} value={num.toString()}>
                          {num} {text[language].stars}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="comment">{text[language].comment}</Label>
                  <Textarea
                    id="comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    rows={4}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="visitDate">{text[language].visitDate}</Label>
                  <Input
                    id="visitDate"
                    type="date"
                    value={visitDate}
                    onChange={(e) => setVisitDate(e.target.value)}
                  />
                </div>

                <Button type="submit" className="w-full" disabled={submitting}>
                  {submitting ? '...' : text[language].submit}
                </Button>
              </form>
            </CardContent>
          </Card>
        ) : (
          <Card className="mb-12 max-w-2xl mx-auto">
            <CardContent className="flex flex-col items-center justify-center py-8">
              <p className="text-muted-foreground mb-4">{text[language].loginToReview}</p>
              <Button onClick={() => navigate('/auth')}>
                {text[language].loginToReview}
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Reviews List */}
        <div className="max-w-4xl mx-auto space-y-6">
          {loading ? (
            <p className="text-center text-muted-foreground">Loading reviews...</p>
          ) : reviews.length === 0 ? (
            <p className="text-center text-muted-foreground">{text[language].noReviews}</p>
          ) : (
            reviews.map((review) => (
              <Card key={review.id}>
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-semibold">{review.destination}</h3>
                      <div className="flex items-center gap-1 mt-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < review.rating
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'text-muted'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    {review.visit_date && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        {format(new Date(review.visit_date), 'MMM d, yyyy')}
                      </div>
                    )}
                  </div>
                   <p className="text-foreground">{review.comment}</p>
                   <div className="flex items-center justify-between mt-3">
                     <p className="text-sm text-muted-foreground">
                       By {review.profiles?.username || 'Anonymous'}
                     </p>
                     <p className="text-xs text-muted-foreground">
                       {format(new Date(review.created_at), 'MMM d, yyyy')}
                     </p>
                   </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
