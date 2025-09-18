import { useState } from 'react';
import { Navigation } from '@/components/Navigation';
import { HeroSection } from '@/components/HeroSection';
import { SearchSection } from '@/components/SearchSection';
import { FeaturedDestinations } from '@/components/FeaturedDestinations';
import { AIChatbot } from '@/components/AIChatbot';
import { LoginModal } from '@/components/LoginModal';

const Index = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [language, setLanguage] = useState<'en' | 'ar'>('en');

  return (
    <div className="min-h-screen bg-background">
      <Navigation 
        onLoginClick={() => setIsLoginOpen(true)}
        language={language}
        onLanguageChange={setLanguage}
      />
      
      <HeroSection language={language} />
      
      <SearchSection language={language} />
      
      <FeaturedDestinations language={language} />
      
      <AIChatbot language={language} />
      
      <LoginModal 
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        language={language}
      />
    </div>
  );
};

export default Index;