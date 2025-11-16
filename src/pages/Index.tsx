import { useState } from 'react';
import { Navigation } from '@/components/Navigation';
import { HeroSection } from '@/components/HeroSection';
import { SearchSection } from '@/components/SearchSection';
import { FeaturedDestinations } from '@/components/FeaturedDestinations';
import { AIChatbot } from '@/components/AIChatbot';
import { Footer } from '@/components/Footer';

const Index = () => {
  const [language, setLanguage] = useState<'en' | 'ar'>('en');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation 
        language={language}
        onLanguageChange={setLanguage}
      />
      
      <HeroSection language={language} />
      
      <SearchSection 
        language={language}
        onSearch={setSearchQuery}
      />
      
      <FeaturedDestinations 
        language={language}
        searchQuery={searchQuery}
      />
      
      <AIChatbot language={language} />
      
      <Footer />
    </div>
  );
};

export default Index;