import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, MapPin, Clock, Star } from 'lucide-react';

interface SearchSectionProps {
  language: 'en' | 'ar';
}

export const SearchSection = ({ language }: SearchSectionProps) => {
  const [searchQuery, setSearchQuery] = useState('');

  const text = {
    en: {
      title: 'Where would you like to explore?',
      placeholder: 'Search destinations, experiences, or attractions...',
      popular: 'Popular Searches',
      searches: ['Al Jahili Fort', 'Al Bidya Mosque', 'Hatta Heritage Village', 'Al Fahidi District', 'Qasr Al Hosn']
    },
    ar: {
      title: 'أين تريد أن تستكشف؟',
      placeholder: 'ابحث عن الوجهات أو التجارب أو المعالم السياحية...',
      popular: 'عمليات البحث الشائعة',
      searches: ['قلعة الجاهلي', 'مسجد البدية', 'قرية حتا التراثية', 'حي الفهيدي', 'قصر الحصن']
    }
  };

  const isRTL = language === 'ar';

  return (
    <section className={`py-20 bg-gradient-to-b from-background to-muted/30 ${isRTL ? 'rtl' : ''}`}>
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8 gradient-text">
            {text[language].title}
          </h2>

          {/* Search Bar */}
          <div className="search-bar mb-8">
            <div className="flex items-center space-x-4">
              <Search className="w-6 h-6 text-muted-foreground" />
              <Input
                type="text"
                placeholder={text[language].placeholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 border-0 focus-visible:ring-0 text-lg"
              />
              <Button className="btn-hero px-8">
                {language === 'en' ? 'Search' : 'بحث'}
              </Button>
            </div>
          </div>

          {/* Popular Searches */}
          <div className="text-center">
            <p className="text-muted-foreground mb-4 font-medium">
              {text[language].popular}
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {text[language].searches.map((search, index) => (
                <button
                  key={index}
                  onClick={() => setSearchQuery(search)}
                  className="px-4 py-2 bg-card border border-border rounded-full text-sm hover:bg-muted transition-colors hover:border-primary"
                >
                  {search}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};