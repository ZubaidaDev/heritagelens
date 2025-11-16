import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';
import uaeHero from '@/assets/uae-hero.jpg';

interface HeroSectionProps {
  language: 'en' | 'ar';
}

export const HeroSection = ({ language }: HeroSectionProps) => {
  const text = {
    en: {
      title: 'Discover the Magic of UAE',
      subtitle: 'AI-Powered Travel Insights',
      description: 'Experience the perfect blend of modern luxury and ancient traditions. Get personalized recommendations, cultural insights, and real-time travel information.',
      cta: 'Start Exploring',
      aiPowered: 'AI-Powered Recommendations'
    },
    ar: {
      title: 'اكتشف سحر دولة الإمارات',
      subtitle: 'رؤى السفر المدعومة بالذكاء الاصطناعي',
      description: 'استمتع بالمزج المثالي بين الرفاهية الحديثة والتقاليد العريقة. احصل على توصيات مخصصة ونظرات ثقافية ومعلومات سفر فورية.',
      cta: 'ابدأ الاستكشاف',
      aiPowered: 'توصيات مدعومة بالذكاء الاصطناعي'
    }
  };

  const isRTL = language === 'ar';

  return (
    <section className={`relative min-h-screen flex items-center justify-center ${isRTL ? 'rtl' : ''}`}>
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src={uaeHero} 
          alt="UAE Landmarks"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-overlay"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6 animate-fade-in">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
          {text[language].title}
        </h1>
        
        <p className="text-xl md:text-2xl text-primary font-semibold mb-4">
          {text[language].subtitle}
        </p>
        
        <p className="text-lg text-white/90 mb-12 max-w-2xl mx-auto leading-relaxed">
          {text[language].description}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            size="lg" 
            className="btn-hero group animate-bounce-gentle"
          >
            {text[language].cta}
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
          
          <Button 
            size="lg" 
            variant="outline"
            className="btn-secondary"
          >
            {language === 'en' ? 'Watch Video' : 'شاهد الفيديو'}
          </Button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};