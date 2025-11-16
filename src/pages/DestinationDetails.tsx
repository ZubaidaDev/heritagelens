import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Navigation } from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { supabase } from '@/integrations/supabase/client';
import { ArrowLeft, Clock, DollarSign, MapPin, Star, Info, Users, Calendar, Shield } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

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

const DestinationDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const destination = location.state?.destination;
  const [details, setDetails] = useState<DestinationDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [realRating, setRealRating] = useState<number>(0);
  const [realReviewCount, setRealReviewCount] = useState<number>(0);

  useEffect(() => {
    if (!destination) {
      navigate('/');
      return;
    }

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

    const fetchReviewStats = async () => {
      const { data, error } = await supabase
        .from('reviews')
        .select('rating')
        .eq('destination', destination.name);

      if (!error && data) {
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
    fetchReviewStats();

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
          fetchReviewStats();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [destination, navigate, toast]);

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
                const query = encodeURIComponent(`${destination.name}, ${destination.location}`);
                window.open(`https://maps.google.com/maps?q=${query}`, '_blank');
              }}
            >
              <MapPin className="w-4 h-4 mr-2" />
              Get Directions
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DestinationDetails;
