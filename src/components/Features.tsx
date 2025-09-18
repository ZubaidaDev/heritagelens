import { Bot, Navigation, MessageSquare, Sparkles, MapPin, Clock } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface FeaturesProps {
  language: 'en' | 'ar';
}

export const Features = ({ language }: FeaturesProps) => {
  const text = {
    en: {
      title: 'AI-Powered Travel Experience',
      subtitle: 'Discover UAE like never before with intelligent features designed for modern travelers',
      features: [
        {
          icon: Bot,
          title: 'AI Cultural Guide',
          description: 'Chat with our intelligent guide to learn fascinating stories, cultural significance, and historical context of every site you visit.',
          highlights: ['Historical Stories', 'Cultural Context', 'Local Insights', 'Interactive Chat']
        },
        {
          icon: Navigation,
          title: 'Smart Navigation',
          description: 'Get precise directions, travel time estimates, and discover nearby restaurants and amenities for the perfect visit planning.',
          highlights: ['Live Directions', 'Travel Times', 'Nearby Dining', 'Amenity Finder']
        },
        {
          icon: MessageSquare,
          title: 'Community Reviews',
          description: 'Read authentic experiences from fellow visitors and share your own insights to help others discover the UAE\'s treasures.',
          highlights: ['Authentic Reviews', 'Photo Sharing', 'Rating System', 'Travel Tips']
        }
      ]
    },
    ar: {
      title: 'تجربة سفر مدعومة بالذكاء الاصطناعي',
      subtitle: 'اكتشف دولة الإمارات كما لم تفعل من قبل مع الميزات الذكية المصممة للمسافرين العصريين',
      features: [
        {
          icon: Bot,
          title: 'الدليل الثقافي الذكي',
          description: 'تحدث مع دليلنا الذكي لتعلم القصص الرائعة والأهمية الثقافية والسياق التاريخي لكل موقع تزوره.',
          highlights: ['القصص التاريخية', 'السياق الثقافي', 'الرؤى المحلية', 'المحادثة التفاعلية']
        },
        {
          icon: Navigation,
          title: 'الملاحة الذكية',
          description: 'احصل على اتجاهات دقيقة وتقديرات زمنية للسفر واكتشف المطاعم والمرافق القريبة للتخطيط المثالي للزيارة.',
          highlights: ['الاتجاهات المباشرة', 'أوقات السفر', 'المطاعم القريبة', 'باحث المرافق']
        },
        {
          icon: MessageSquare,
          title: 'تقييمات المجتمع',
          description: 'اقرأ التجارب الأصيلة من الزوار الآخرين وشارك رؤاك الخاصة لمساعدة الآخرين على اكتشاف كنوز الإمارات.',
          highlights: ['تقييمات أصيلة', 'مشاركة الصور', 'نظام التقييم', 'نصائح السفر']
        }
      ]
    }
  };

  const isRTL = language === 'ar';

  return (
    <section className={`py-20 bg-gradient-subtle ${isRTL ? 'rtl' : ''}`}>
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Sparkles className="w-6 h-6 text-primary" />
            <span className="text-primary font-semibold">
              {language === 'en' ? 'AI-Powered' : 'مدعوم بالذكاء الاصطناعي'}
            </span>
          </div>
          <h2 className="text-4xl font-bold mb-4 gradient-text">
            {text[language].title}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {text[language].subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {text[language].features.map((feature, index) => (
            <Card 
              key={index} 
              className="group p-8 hover:shadow-floating transition-all duration-300 hover:scale-105 border border-border/50 bg-card/50 backdrop-blur-sm animate-fade-in"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="text-center space-y-6">
                {/* Icon */}
                <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-hero flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>

                {/* Content */}
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-card-foreground">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                {/* Highlights */}
                <div className="space-y-2">
                  {feature.highlights.map((highlight, idx) => (
                    <div 
                      key={idx} 
                      className="flex items-center space-x-2 text-sm text-muted-foreground justify-center"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};