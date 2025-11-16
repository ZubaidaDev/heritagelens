import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { supabase } from '@/integrations/supabase/client';
import { ArrowLeft, Clock, DollarSign, MapPin, Star, Info, Users, Calendar, Shield, MessageSquare } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import type { Session } from '@supabase/supabase-js';
import { DESTINATION_NAMES } from '@/data/destinations';
import { getGoogleMapsUrl } from '@/data/destinationCoordinates';

interface DestinationDetails {
  openingHours: string;
  dressCode: string;
  entryFee: string;
  bestTimeToVisit: string;
  historicalFacts: string[];
  importantNotes: string[];
  facilities: string[];
  accessibility: string;
}

interface Review {
  id: string;
  rating: number;
  comment: string;
  visit_date: string | null;
  created_at: string;
  profiles: {
    username: string;
  };
}

interface AIRecommendation {
  destination: string;
  reason: string;
  confidence: number;
}

const DestinationDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const destination = location.state?.destination;
  const [details, setDetails] = useState<DestinationDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [realRating, setRealRating] = useState<number>(0);
  const [realReviewCount, setRealReviewCount] = useState<number>(0);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [session, setSession] = useState<Session | null>(null);
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [aiRecommendations, setAiRecommendations] = useState<AIRecommendation[]>([]);
  const [loadingRecommendations, setLoadingRecommendations] = useState(false);

  useEffect(() => {
    if (!destination) {
      navigate('/');
      return;
    }

    // Get session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [destination, navigate]);

  useEffect(() => {
    if (!destination) return;

    const fetchDetails = async () => {
      try {
        const { data, error } = await supabase.functions.invoke('destination-details', {
          body: {
            destinationName: destination.name,
            location: destination.location,
            category: destination.category,
            description: destination.description,
          }
        });

        if (error) throw error;
        setDetails(data);
      } catch (error) {
        console.error('Error fetching destination details:', error);
        toast({
          title: "Error",
          description: "Failed to load destination details. Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    const fetchReviews = async () => {
      const { data, error } = await supabase
        .from('reviews')
        .select(`
          id,
          rating,
          comment,
          visit_date,
          created_at,
          profiles (
            username
          )
        `)
        .eq('destination', destination.name)
        .order('created_at', { ascending: false });

      if (!error && data) {
        setReviews(data as Review[]);
        setRealReviewCount(data.length);
        if (data.length > 0) {
          const avgRating = data.reduce((sum, review) => sum + review.rating, 0) / data.length;
          setRealRating(Math.round(avgRating * 10) / 10);
        } else {
          setRealRating(0);
        }
      }
    };

    fetchDetails();
    fetchReviews();

    // Set up realtime subscription for reviews
    const channel = supabase
      .channel('reviews-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'reviews'
        },
        () => {
          fetchReviews();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [destination, toast]);

  // Fetch AI recommendations for logged-in users
  useEffect(() => {
    if (!session?.user || !destination) return;

    const fetchAIRecommendations = async () => {
      setLoadingRecommendations(true);
      try {
        const { data, error } = await supabase.functions.invoke('ai-recommendations', {
          body: {
            userId: session.user.id,
            currentDestination: destination.name,
            allDestinations: Array.from(DESTINATION_NAMES)
          }
        });

        if (error) throw error;
        setAiRecommendations(data?.recommendations || []);
      } catch (error) {
        console.error('Error fetching AI recommendations:', error);
      } finally {
        setLoadingRecommendations(false);
      }
    };

    fetchAIRecommendations();
  }, [session, destination]);

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!session) {
      toast({
        title: "Authentication Required",
        description: "Please log in to submit a review.",
        variant: "destructive",
      });
      return;
    }

    setSubmitting(true);
    
    const { error } = await supabase
      .from('reviews')
      .insert({
        destination: destination.name,
        rating: newRating,
        comment: newComment,
        user_id: session.user.id,
      });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to submit review. Please try again.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "Your review has been submitted!",
      });
      setNewComment('');
      setNewRating(5);
    }
    
    setSubmitting(false);
  };

  if (!destination) return null;

  return (
    <div className="min-h-screen bg-background">
      <Navigation language="en" onLanguageChange={() => {}} />
      
      <div className="container mx-auto px-4 py-8">
        <Button 
          variant="ghost" 
          onClick={() => navigate(-1)}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        {/* Hero Section */}
        <div className="relative h-96 rounded-2xl overflow-hidden mb-8">
          <img 
            src={destination.image} 
            alt={destination.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
          <div className="absolute bottom-8 left-8 right-8">
            <Badge className="mb-4">{destination.category}</Badge>
            <h1 className="text-4xl font-bold text-foreground mb-2">{destination.name}</h1>
            <div className="flex items-center space-x-4 text-muted-foreground">
              <div className="flex items-center space-x-1">
                <MapPin className="w-5 h-5" />
                <span>{destination.location}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <span className="font-semibold">
                  {realReviewCount > 0 ? realRating : 'No rating'}
                </span>
                <span>
                  ({realReviewCount > 0 ? `${realReviewCount.toLocaleString()} reviews` : 'Be the first to review'})
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="md:col-span-2 space-y-6">
            {/* About */}
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4">About</h2>
              <p className="text-muted-foreground leading-relaxed">{destination.description}</p>
              <div className="mt-4">
                <p className="text-sm text-primary font-medium">{destination.aiTip}</p>
              </div>
            </Card>

            {/* Historical Facts */}
            {loading ? (
              <Card className="p-6">
                <Skeleton className="h-8 w-48 mb-4" />
                <Skeleton className="h-20 w-full" />
              </Card>
            ) : details && (
              <Card className="p-6">
                <h2 className="text-2xl font-bold mb-4 flex items-center">
                  <Info className="w-6 h-6 mr-2 text-primary" />
                  Interesting Facts
                </h2>
                <ul className="space-y-3">
                  {details.historicalFacts?.map((fact, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <span className="text-primary font-bold mt-1">•</span>
                      <span className="text-muted-foreground">{fact}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            )}

            {/* Important Notes */}
            {!loading && details && (
              <Card className="p-6">
                <h2 className="text-2xl font-bold mb-4 flex items-center">
                  <Shield className="w-6 h-6 mr-2 text-primary" />
                  Important Information
                </h2>
                <ul className="space-y-3">
                  {details.importantNotes?.map((note, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <span className="text-primary font-bold mt-1">•</span>
                      <span className="text-muted-foreground">{note}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Info */}
            <Card className="p-6">
              <h3 className="text-xl font-bold mb-4">Quick Info</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <DollarSign className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <p className="font-semibold">Price</p>
                    {loading ? (
                      <Skeleton className="h-4 w-32 mt-1" />
                    ) : (
                      <p className="text-sm text-muted-foreground">{details?.entryFee || destination.price}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Clock className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <p className="font-semibold">Opening Hours</p>
                    {loading ? (
                      <Skeleton className="h-4 w-32 mt-1" />
                    ) : (
                      <p className="text-sm text-muted-foreground">{details?.openingHours || 'Check locally'}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Users className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <p className="font-semibold">Dress Code</p>
                    {loading ? (
                      <Skeleton className="h-4 w-32 mt-1" />
                    ) : (
                      <p className="text-sm text-muted-foreground">{details?.dressCode || 'Casual'}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Calendar className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <p className="font-semibold">Best Time to Visit</p>
                    {loading ? (
                      <Skeleton className="h-4 w-32 mt-1" />
                    ) : (
                      <p className="text-sm text-muted-foreground">{details?.bestTimeToVisit || 'Year-round'}</p>
                    )}
                  </div>
                </div>
              </div>
            </Card>

            {/* Facilities */}
            {!loading && details && details.facilities && (
              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4">Facilities</h3>
                <div className="flex flex-wrap gap-2">
                  {details.facilities.map((facility, index) => (
                    <Badge key={index} variant="secondary">
                      {facility}
                    </Badge>
                  ))}
                </div>
              </Card>
            )}

            {/* Accessibility */}
            {!loading && details && details.accessibility && (
              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4">Accessibility</h3>
                <p className="text-sm text-muted-foreground">{details.accessibility}</p>
              </Card>
            )}

            {/* Get Directions Button */}
            <Button 
              className="w-full btn-hero"
              onClick={() => {
                const mapsUrl = getGoogleMapsUrl(destination.name);
                window.open(mapsUrl, '_blank');
              }}
            >
              <MapPin className="w-4 h-4 mr-2" />
              Get Directions
            </Button>
          </div>
        </div>

        {/* AI-Powered Recommendations for Logged-In Users */}
        {session && aiRecommendations.length > 0 && (
          <div className="max-w-5xl mx-auto mb-16">
            <Card className="p-8 bg-gradient-to-br from-accent/5 to-primary/5 border-accent/20">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Info className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-display font-semibold">Recommendations</h2>
                  <p className="text-sm text-muted-foreground">Based on your travel history and preferences</p>
                </div>
              </div>
              
              {loadingRecommendations ? (
                <div className="space-y-4">
                  {[1, 2, 3].map(i => (
                    <Skeleton key={i} className="h-24 w-full" />
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {aiRecommendations.map((rec, index) => (
                    <Card 
                      key={index} 
                      className="p-5 hover:shadow-md transition-shadow cursor-pointer bg-card"
                      onClick={() => {
                        // Find destination and navigate
                        const destData = {
                          name: rec.destination,
                          location: 'UAE',
                          category: 'Heritage Site'
                        };
                        navigate('/destination-details', { state: { destination: destData } });
                      }}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold mb-1 text-primary">{rec.destination}</h3>
                          <p className="text-sm text-muted-foreground leading-relaxed">{rec.reason}</p>
                        </div>
                        <Badge variant="secondary" className="shrink-0">
                          {Math.round(rec.confidence * 100)}% match
                        </Badge>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </Card>
          </div>
        )}

        {/* Reviews Section */}
        <div className="mt-12">
          <h2 className="text-3xl font-bold mb-6 flex items-center">
            <MessageSquare className="w-8 h-8 mr-3 text-primary" />
            Reviews ({realReviewCount})
          </h2>

          {/* Add Review Form - Only for authenticated users */}
          {session && (
            <Card className="p-6 mb-8">
              <h3 className="text-xl font-bold mb-4">Write a Review</h3>
              <form onSubmit={handleSubmitReview}>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="rating">Rating</Label>
                    <div className="flex items-center space-x-2 mt-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-8 h-8 cursor-pointer transition-colors ${
                            star <= newRating
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-muted-foreground'
                          }`}
                          onClick={() => setNewRating(star)}
                        />
                      ))}
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="comment">Your Review</Label>
                    <Textarea
                      id="comment"
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Share your experience..."
                      required
                      className="mt-2 min-h-32"
                    />
                  </div>
                  <Button type="submit" disabled={submitting}>
                    {submitting ? 'Submitting...' : 'Submit Review'}
                  </Button>
                </div>
              </form>
            </Card>
          )}

          {/* Reviews List */}
          <div className="space-y-4">
            {reviews.length === 0 ? (
              <Card className="p-8 text-center">
                <p className="text-muted-foreground">No reviews yet. Be the first to review!</p>
              </Card>
            ) : (
              reviews.map((review) => (
                <Card key={review.id} className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="font-semibold">{review.profiles.username}</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(review.created_at).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </p>
                    </div>
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < review.rating
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-muted-foreground'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">{review.comment}</p>
                  {review.visit_date && (
                    <p className="text-xs text-muted-foreground mt-3">
                      Visited: {new Date(review.visit_date).toLocaleDateString()}
                    </p>
                  )}
                </Card>
              ))
            )}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default DestinationDetails;
