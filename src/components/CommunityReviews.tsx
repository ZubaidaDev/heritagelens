import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar } from '@/components/ui/avatar';
import { Star, ThumbsUp, Camera, MapPin, Calendar, MessageSquare } from 'lucide-react';

interface CommunityReviewsProps {
  language: 'en' | 'ar';
}

interface Review {
  id: number;
  userName: string;
  userAvatar: string;
  location: string;
  rating: number;
  date: string;
  destination: string;
  review: string;
  images: string[];
  likes: number;
  helpful: boolean;
  tags: string[];
}

export const CommunityReviews = ({ language }: CommunityReviewsProps) => {
  const [selectedDestination, setSelectedDestination] = useState('all');

  const text = {
    en: {
      title: 'Community Reviews',
      subtitle: 'Read authentic experiences from fellow visitors and share your insights',
      filterBy: 'Filter by destination:',
      allDestinations: 'All Destinations',
      helpful: 'Helpful',
      likes: 'likes',
      writeReview: 'Write a Review',
      shareExperience: 'Share Your Experience'
    },
    ar: {
      title: 'تقييمات المجتمع',
      subtitle: 'اقرأ التجارب الأصيلة من الزوار الآخرين وشارك رؤاك',
      filterBy: 'تصفية حسب الوجهة:',
      allDestinations: 'جميع الوجهات',
      helpful: 'مفيد',
      likes: 'إعجاب',
      writeReview: 'اكتب تقييماً',
      shareExperience: 'شارك تجربتك'
    }
  };

  const reviews: Review[] = [
    {
      id: 1,
      userName: 'Sarah Johnson',
      userAvatar: '/placeholder.svg',
      location: 'New York, USA',
      rating: 5,
      date: '2 days ago',
      destination: 'Burj Khalifa',
      review: 'Absolutely breathtaking experience! The sunset views from the 148th floor were incredible. Book the Sky Lounge for a more exclusive experience. The elevator ride itself is an attraction!',
      images: ['/placeholder.svg', '/placeholder.svg'],
      likes: 24,
      helpful: true,
      tags: ['sunset views', 'sky lounge', 'photography']
    },
    {
      id: 2,
      userName: 'Ahmed Al Rashid',
      userAvatar: '/placeholder.svg',
      location: 'Riyadh, Saudi Arabia',
      rating: 5,
      date: '1 week ago',
      destination: 'Sheikh Zayed Grand Mosque',
      review: 'A spiritual and architectural masterpiece. The intricate details and peaceful atmosphere are truly moving. Free guided tours are excellent. Visit during golden hour for best photos.',
      images: ['/placeholder.svg'],
      likes: 31,
      helpful: true,
      tags: ['spiritual', 'architecture', 'guided tour']
    },
    {
      id: 3,
      userName: 'Maria Rodriguez',
      userAvatar: '/placeholder.svg',
      location: 'Barcelona, Spain',
      rating: 4,
      date: '3 days ago',
      destination: 'Desert Safari',
      review: 'Thrilling dune bashing and amazing cultural show! The BBQ dinner was delicious. Wear comfortable clothes and bring a jacket for the evening. Camel riding was gentler than expected.',
      images: ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg'],
      likes: 18,
      helpful: true,
      tags: ['dune bashing', 'cultural show', 'BBQ dinner']
    },
    {
      id: 4,
      userName: 'James Chen',
      userAvatar: '/placeholder.svg',
      location: 'Singapore',
      rating: 5,
      date: '5 days ago',
      destination: 'Burj Al Arab',
      review: 'Pure luxury! The afternoon tea at Skyview Bar was extraordinary with stunning views. Service was impeccable. Expensive but worth it for a special occasion. Book well in advance!',
      images: ['/placeholder.svg'],
      likes: 27,
      helpful: true,
      tags: ['luxury', 'afternoon tea', 'skyview bar']
    }
  ];

  const destinations = ['all', 'Burj Khalifa', 'Sheikh Zayed Grand Mosque', 'Desert Safari', 'Burj Al Arab'];
  
  const filteredReviews = selectedDestination === 'all' 
    ? reviews 
    : reviews.filter(review => review.destination === selectedDestination);

  const isRTL = language === 'ar';

  return (
    <section className={`py-20 bg-background ${isRTL ? 'rtl' : ''}`}>
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <MessageSquare className="w-6 h-6 text-primary" />
            <span className="text-primary font-semibold">
              {language === 'en' ? 'Community Insights' : 'رؤى المجتمع'}
            </span>
          </div>
          <h2 className="text-4xl font-bold mb-4 gradient-text">
            {text[language].title}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {text[language].subtitle}
          </p>
        </div>

        {/* Filter and Write Review */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-4">
            <span className="text-muted-foreground">{text[language].filterBy}</span>
            <select 
              value={selectedDestination}
              onChange={(e) => setSelectedDestination(e.target.value)}
              className="bg-card border border-border rounded-lg px-3 py-1 text-sm"
            >
              <option value="all">{text[language].allDestinations}</option>
              {destinations.slice(1).map(dest => (
                <option key={dest} value={dest}>{dest}</option>
              ))}
            </select>
          </div>
          <Button className="btn-hero">
            <Camera className="w-4 h-4 mr-2" />
            {text[language].writeReview}
          </Button>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {filteredReviews.map((review, index) => (
            <Card 
              key={review.id} 
              className="p-6 hover:shadow-floating transition-all duration-300 border border-border/50 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* User Info */}
              <div className="flex items-start space-x-4 mb-4">
                <Avatar className="w-12 h-12">
                  <img src={review.userAvatar} alt={review.userName} />
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="font-semibold text-card-foreground">{review.userName}</h4>
                    <Badge variant="secondary" className="text-xs">
                      <MapPin className="w-3 h-3 mr-1" />
                      {review.location}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-3 h-3 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground/30'}`} 
                        />
                      ))}
                    </div>
                    <span>•</span>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-3 h-3" />
                      <span>{review.date}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Destination */}
              <Badge className="mb-3" variant="outline">
                {review.destination}
              </Badge>

              {/* Review Content */}
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                {review.review}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {review.tags.map((tag, idx) => (
                  <Badge key={idx} variant="secondary" className="text-xs">
                    #{tag}
                  </Badge>
                ))}
              </div>

              {/* Images */}
              {review.images.length > 0 && (
                <div className="flex space-x-2 mb-4">
                  {review.images.slice(0, 3).map((image, idx) => (
                    <div key={idx} className="relative">
                      <img 
                        src={image} 
                        alt={`Review image ${idx + 1}`}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      {idx === 2 && review.images.length > 3 && (
                        <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center">
                          <span className="text-white text-xs font-medium">
                            +{review.images.length - 3}
                          </span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center justify-between">
                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
                  <ThumbsUp className="w-4 h-4 mr-1" />
                  {review.likes} {text[language].likes}
                </Button>
                <Button variant="ghost" size="sm" className="text-muted-foreground">
                  {text[language].helpful}
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Card className="max-w-md mx-auto p-6 bg-gradient-hero text-white">
            <MessageSquare className="w-8 h-8 mx-auto mb-3" />
            <h3 className="text-lg font-semibold mb-2">
              {text[language].shareExperience}
            </h3>
            <p className="text-white/80 text-sm mb-4">
              {language === 'en' 
                ? 'Help fellow travelers by sharing your UAE experiences'
                : 'ساعد المسافرين الآخرين بمشاركة تجاربك في الإمارات'
              }
            </p>
            <Button variant="secondary" className="w-full">
              {text[language].writeReview}
            </Button>
          </Card>
        </div>
      </div>
    </section>
  );
};