import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, MapPin, Clock, DollarSign, Info, Users, Utensils, Navigation, Route } from 'lucide-react';

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

  const text = {
    en: {
      reviews: 'reviews',
      viewDetails: 'View Details',
      getDirections: 'Get Directions',
      aiTips: 'AI Tips',
      amenities: 'Amenities',
      nearbyDining: 'Nearby Dining',
      smartNav: 'Smart Navigation'
    },
    ar: {
      reviews: 'تقييم',
      viewDetails: 'عرض التفاصيل',
      getDirections: 'الحصول على الاتجاهات',
      aiTips: 'نصائح الذكاء الاصطناعي',
      amenities: 'المرافق',
      nearbyDining: 'المطاعم القريبة',
      smartNav: 'الملاحة الذكية'
    }
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
          
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center space-x-1">
              <MapPin className="w-4 h-4" />
              <span>{destination.location}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>{destination.duration}</span>
            </div>
          </div>

          {/* Rating */}
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="font-semibold">{destination.rating}</span>
            </div>
            <span className="text-sm text-muted-foreground">
              ({destination.reviews.toLocaleString()} {text[language].reviews})
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
            {destination.amenities.slice(0, 3).map((amenity, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {amenity}
              </Badge>
            ))}
            {destination.amenities.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{destination.amenities.length - 3} more
              </Badge>
            )}
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

        {/* Smart Navigation */}
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Route className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">{text[language].smartNav}</span>
          </div>
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="flex-1 text-xs"
              onClick={() => {
                // Simulate smart navigation
                const destinationQuery = encodeURIComponent(`${destination.name}, ${destination.location}, UAE`);
                window.open(`https://maps.google.com/maps?q=${destinationQuery}`, '_blank');
              }}
            >
              <Navigation className="w-3 h-3 mr-1" />
              {text[language].getDirections}
            </Button>
            <Button 
              variant="secondary" 
              size="sm" 
              className="text-xs px-2"
              title={language === 'en' ? 'Travel time estimate' : 'تقدير وقت السفر'}
            >
              <Clock className="w-3 h-3" />
            </Button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2 mt-4">
          <Button className="flex-1 btn-hero">
            {text[language].viewDetails}
          </Button>
        </div>
      </div>
    </Card>
  );
};