import { useState } from 'react';
import { Navigation } from '@/components/Navigation';
import { HeroSection } from '@/components/HeroSection';
import { SearchSection } from '@/components/SearchSection';
import { FeaturedDestinations } from '@/components/FeaturedDestinations';
import { AIChatbot } from '@/components/AIChatbot';

const Index = () => {
  const [language, setLanguage] = useState<'en' | 'ar'>('en');

  return (
    <div className="min-h-screen bg-background">
      <Navigation 
        language={language}
        onLanguageChange={setLanguage}
      />
      
      <HeroSection language={language} />
      
      <SearchSection language={language} />
      
      <FeaturedDestinations language={language} />
      
      <AIChatbot language={language} />
    </div>
  );
};

export default Index;