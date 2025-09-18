import { Button } from '@/components/ui/button';
import { Globe, MapPin, User } from 'lucide-react';

interface NavigationProps {
  onLoginClick: () => void;
  language: 'en' | 'ar';
  onLanguageChange: (lang: 'en' | 'ar') => void;
}

export const Navigation = ({ onLoginClick, language, onLanguageChange }: NavigationProps) => {
  const isRTL = language === 'ar';
  
  const text = {
    en: {
      brand: 'UAE Explorer',
      destinations: 'Destinations',
      experiences: 'Experiences', 
      reviews: 'Reviews',
      login: 'Login'
    },
    ar: {
      brand: 'مستكشف الإمارات',
      destinations: 'الوجهات',
      experiences: 'التجارب',
      reviews: 'التقييمات', 
      login: 'تسجيل الدخول'
    }
  };

  return (
    <nav className={`fixed top-0 w-full z-50 glass-effect border-b border-border/50 ${isRTL ? 'rtl' : ''}`}>
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Brand */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-hero flex items-center justify-center">
              <MapPin className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-bold gradient-text">
              {text[language].brand}
            </span>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#destinations" className="text-foreground hover:text-primary transition-colors font-medium">
              {text[language].destinations}
            </a>
            <a href="#experiences" className="text-foreground hover:text-primary transition-colors font-medium">
              {text[language].experiences}
            </a>
            <a href="#reviews" className="text-foreground hover:text-primary transition-colors font-medium">
              {text[language].reviews}
            </a>
          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-4">
            {/* Language Switcher */}
            <div className="lang-switcher">
              <button
                onClick={() => onLanguageChange('en')}
                className={`lang-option ${language === 'en' ? 'active' : ''}`}
              >
                EN
              </button>
              <button
                onClick={() => onLanguageChange('ar')}
                className={`lang-option ${language === 'ar' ? 'active' : ''}`}
              >
                العربية
              </button>
            </div>

            <Button
              onClick={onLoginClick}
              variant="outline"
              className="flex items-center space-x-2"
            >
              <User className="w-4 h-4" />
              <span>{text[language].login}</span>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};