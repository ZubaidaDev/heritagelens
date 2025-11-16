import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { MapPin, User, LogOut } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Session } from '@supabase/supabase-js';
import { toast } from 'sonner';

interface NavigationProps {
  language: 'en' | 'ar';
  onLanguageChange: (lang: 'en' | 'ar') => void;
}

export const Navigation = ({ language, onLanguageChange }: NavigationProps) => {
  const navigate = useNavigate();
  const [session, setSession] = useState<Session | null>(null);
  const isRTL = language === 'ar';
  
  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
    });

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error('Failed to logout');
    } else {
      toast.success('Logged out successfully');
    }
  };
  
  const text = {
    en: {
      brand: 'HeritageLens',
      home: 'Home',
      destinations: 'Recommendations',
      reviews: 'Reviews',
      journal: 'Journals',
      login: 'Login',
      logout: 'Logout'
    },
    ar: {
      brand: 'عدسة التراث',
      home: 'الرئيسية',
      destinations: 'التوصيات',
      reviews: 'التقييمات',
      journal: 'اليوميات',
      login: 'تسجيل الدخول',
      logout: 'تسجيل الخروج'
    }
  };

  return (
    <nav className={`fixed top-0 w-full z-50 glass-effect border-b border-border/50 ${isRTL ? 'rtl' : ''}`}>
      <div className="container mx-auto px-6 py-4">
        <div className="flex flex-col items-center space-y-4">
          {/* Brand */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-hero flex items-center justify-center">
              <MapPin className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-bold gradient-text">
              {text[language].brand}
            </span>
          </div>

          {/* Navigation Row */}
          <div className="flex items-center justify-center gap-8 w-full flex-wrap">
            {/* Navigation Links */}
            <div className="flex items-center space-x-8">
              <a href="/" className="text-foreground hover:text-primary transition-colors font-medium">
                {text[language].home}
              </a>
              {session && (
                <a href="#destinations" className="text-foreground hover:text-primary transition-colors font-medium">
                  {text[language].destinations}
                </a>
              )}
              <a href="/reviews" className="text-foreground hover:text-primary transition-colors font-medium">
                {text[language].reviews}
              </a>
              <a href="/journal" className="text-foreground hover:text-primary transition-colors font-medium">
                {text[language].journal}
              </a>
            </div>

            {/* Right Side - Language and Auth */}
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

              {session ? (
                <Button
                  onClick={handleLogout}
                  variant="outline"
                  className="flex items-center space-x-2"
                >
                  <LogOut className="w-4 h-4" />
                  <span>{text[language].logout}</span>
                </Button>
              ) : (
                <Button
                  onClick={() => navigate('/auth')}
                  variant="outline"
                  className="flex items-center space-x-2"
                >
                  <User className="w-4 h-4" />
                  <span>{text[language].login}</span>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};