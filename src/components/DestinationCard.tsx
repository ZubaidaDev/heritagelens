import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, MapPin, Clock, DollarSign, Info, Users, Utensils } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { getGoogleMapsUrl } from '@/data/destinationCoordinates';

interface Destination {
  id: number;
  name: string;
  location: string;
  image: string;
  rating: number;
  reviews: number;
  duration: string;
  price: string;
  category: string;
  description: string;
  aiTip: string;
  amenities: string[];
  nearbyRestaurants: Array<{
    name: string;
    cuisine: string;
    distance: string;
  }>;
}

interface DestinationCardProps {
  destination: Destination;
  language: 'en' | 'ar';
}

export const DestinationCard = ({ destination, language }: DestinationCardProps) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [realRating, setRealRating] = useState<number>(0);
  const [realReviewCount, setRealReviewCount] = useState<number>(0);
  const navigate = useNavigate();

  useEffect(() => {
    fetchReviewStats();

    // Set up realtime subscription for reviews
    const channel = supabase
      .channel(`reviews-changes-${destination.id}`)
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
  }, [destination.name]);

  const fetchReviewStats = async () => {
    const { data, error } = await supabase
      .from('reviews')
      .select('rating')
      .eq('destination', destination.name);

    if (!error && data) {
      setRealReviewCount(data.length);
      if (data.length > 0) {
        const avgRating = data.reduce((sum, review) => sum + review.rating, 0) / data.length;
        setRealRating(Math.round(avgRating * 10) / 10); // Round to 1 decimal
      } else {
        setRealRating(0);
      }
    }
  };

  const handleReviewClick = () => {
    navigate('/reviews');
  };

  const text = {
    en: {
      reviews: 'reviews',
      viewDetails: 'View Details',
      getDirections: 'Get Directions',
      aiTips: 'Know before you go',
      amenities: 'Amenities',
      nearbyDining: 'Nearby Dining',
      noRating: 'No rating',
      beFirstReview: 'Be the first to review'
    },
    ar: {
      reviews: 'تقييم',
      viewDetails: 'عرض التفاصيل',
      getDirections: 'احصل على الاتجاهات',
      aiTips: 'اعرف قبل أن تذهب',
      amenities: 'المرافق',
      nearbyDining: 'المطاعم القريبة',
      noRating: 'لا يوجد تقييم',
      beFirstReview: 'كن أول من يقيم'
    }
  };

  const handleGetDirections = () => {
    const mapsUrl = getGoogleMapsUrl(destination.name);
    window.open(mapsUrl, '_blank');
  };

  const handleViewDetails = () => {
    navigate(`/destination/${destination.id}`, { state: { destination } });
  };

  return (
    <Card className="destination-card group overflow-hidden">
      {/* Image Section with Hover Tooltip */}
      <div 
        className="destination-image h-64 relative cursor-pointer"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        <img 
          src={destination.image} 
          alt={destination.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Gradient Overlay */}
        <div className="destination-overlay" />
        
        {/* Category Badge */}
        <Badge className="absolute top-4 left-4 bg-card/90 text-card-foreground border-0">
          {destination.category}
        </Badge>

        {/* AI Tooltip */}
        {showTooltip && (
          <div className="absolute inset-4 flex items-center justify-center z-20">
            <div className="bg-card/95 backdrop-blur-sm rounded-xl p-4 shadow-floating border border-border/50 max-w-sm animate-scale-in">
              <div className="flex items-center space-x-2 mb-2">
                <Info className="w-4 h-4 text-primary" />
                <span className="font-semibold text-sm text-primary">
                  {text[language].aiTips}
                </span>
              </div>
              <p className="text-sm text-card-foreground leading-relaxed">
                {destination.aiTip}
              </p>
            </div>
          </div>
        )}

        {/* Price Badge */}
        <Badge className="absolute top-4 right-4 bg-primary text-primary-foreground">
          {destination.price}
        </Badge>
      </div>

      {/* Content Section */}
      <div className="p-6 space-y-4">
        {/* Header */}
        <div className="space-y-2">
          <h3 className="text-xl font-bold text-card-foreground group-hover:text-primary transition-colors">
            {destination.name}
          </h3>
          
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <MapPin className="w-4 h-4" />
            <span>{destination.location}</span>
          </div>

          {/* Rating */}
          <div 
            className="flex items-center space-x-2 cursor-pointer hover:opacity-75 transition-opacity"
            onClick={handleReviewClick}
            title="Click to view reviews"
          >
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="font-semibold">
                {realReviewCount > 0 ? realRating : text[language].noRating}
              </span>
            </div>
            <span className="text-sm text-muted-foreground">
              ({realReviewCount > 0 ? `${realReviewCount.toLocaleString()} ${text[language].reviews}` : text[language].beFirstReview})
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="text-muted-foreground text-sm leading-relaxed">
          {destination.description}
        </p>

        {/* Amenities */}
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Users className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">{text[language].amenities}</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {destination.amenities.map((amenity, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {amenity}
              </Badge>
            ))}
          </div>
        </div>

        {/* Nearby Restaurants */}
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Utensils className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">{text[language].nearbyDining}</span>
          </div>
          <div className="space-y-1">
            {destination.nearbyRestaurants.slice(0, 2).map((restaurant, index) => (
              <div key={index} className="flex justify-between text-xs text-muted-foreground">
                <span>{restaurant.name} ({restaurant.cuisine})</span>
                <span>{restaurant.distance}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 mt-4">
          <Button className="flex-1 btn-hero" onClick={handleGetDirections}>
            <MapPin className="w-4 h-4 mr-2" />
            {text[language].getDirections}
          </Button>
          <Button className="flex-1" variant="outline" onClick={handleViewDetails}>
            {text[language].viewDetails}
          </Button>
        </div>
      </div>
    </Card>
  );
};