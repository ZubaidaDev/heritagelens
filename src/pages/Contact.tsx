import { useState } from 'react';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { AIChatbot } from '@/components/AIChatbot';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Mail, MapPin, Phone, Send } from 'lucide-react';
import { toast } from 'sonner';
import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(100, 'Name must be less than 100 characters'),
  email: z.string().trim().email('Invalid email address').max(255, 'Email must be less than 255 characters'),
  subject: z.string().trim().min(1, 'Subject is required').max(200, 'Subject must be less than 200 characters'),
  message: z.string().trim().min(10, 'Message must be at least 10 characters').max(1000, 'Message must be less than 1000 characters'),
});

export default function Contact() {
  const [language, setLanguage] = useState<'en' | 'ar'>('en');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; email?: string; subject?: string; message?: string }>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate input
    try {
      contactSchema.parse({ name, email, subject, message });
      setErrors({});
    } catch (err) {
      if (err instanceof z.ZodError) {
        const newErrors: { name?: string; email?: string; subject?: string; message?: string } = {};
        err.errors.forEach((error) => {
          if (error.path[0]) {
            newErrors[error.path[0] as keyof typeof newErrors] = error.message;
          }
        });
        setErrors(newErrors);
        return;
      }
    }

    setSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast.success('Message sent successfully! We\'ll get back to you soon.');
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
      setSubmitting(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation language={language} onLanguageChange={setLanguage} />
      
      <div className="container mx-auto px-4 pt-32 pb-12 flex-1">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-4">Contact Us</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Have a question or feedback? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Contact Form */}
          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    setErrors({ ...errors, name: undefined });
                  }}
                  disabled={submitting}
                />
                {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setErrors({ ...errors, email: undefined });
                  }}
                  disabled={submitting}
                />
                {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  type="text"
                  placeholder="What is this about?"
                  value={subject}
                  onChange={(e) => {
                    setSubject(e.target.value);
                    setErrors({ ...errors, subject: undefined });
                  }}
                  disabled={submitting}
                />
                {errors.subject && <p className="text-sm text-destructive">{errors.subject}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  placeholder="Tell us more..."
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value);
                    setErrors({ ...errors, message: undefined });
                  }}
                  className="min-h-32"
                  disabled={submitting}
                />
                {errors.message && <p className="text-sm text-destructive">{errors.message}</p>}
              </div>

              <Button type="submit" className="w-full btn-hero" disabled={submitting}>
                {submitting ? (
                  'Sending...'
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Send Message
                  </>
                )}
              </Button>
            </form>
          </Card>

          {/* Contact Information */}
          <div className="space-y-6">
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Email</h3>
                    <a href="mailto:info@heritagelens.com" className="text-muted-foreground hover:text-primary transition-colors">
                      info@heritagelens.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Phone</h3>
                    <a href="tel:+971123456789" className="text-muted-foreground hover:text-primary transition-colors">
                      +971 12 345 6789
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Location</h3>
                    <p className="text-muted-foreground">
                      Dubai, United Arab Emirates
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-xl font-bold mb-4">Office Hours</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex justify-between">
                  <span>Sunday - Thursday:</span>
                  <span className="font-medium text-foreground">9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Friday - Saturday:</span>
                  <span className="font-medium text-foreground">Closed</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      <AIChatbot language={language} />
      <Footer />
    </div>
  );
}
