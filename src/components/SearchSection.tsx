import { useState, useEffect, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, MapPin, Clock, Star, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface SearchSectionProps {
  language: 'en' | 'ar';
  onSearch: (query: string) => void;
}

export const SearchSection = ({ language, onSearch }: SearchSectionProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // All available destinations for search
  const allDestinations = [
    'Al Jahili Fort',
    'Al Bidya Mosque',
    'Hatta Heritage Village',
    'Al Fahidi Historical District',
    'Qasr Al Hosn',
    'Sheikh Zayed Grand Mosque',
    'Mleiha Archaeological Centre',
    'Sharjah Heritage Area'
  ];

  const allDestinationsAr = [
    'قلعة الجاهلي',
    'مسجد البدية',
    'قرية حتا التراثية',
    'حي الفهيدي التاريخي',
    'قصر الحصن',
    'مسجد الشيخ زايد الكبير',
    'مركز مليحة الأثري',
    'منطقة الشارقة التراثية'
  ];

  const destinations = language === 'en' ? allDestinations : allDestinationsAr;

  // Filter destinations based on search query
  const filteredDestinations = destinations.filter(dest =>
    dest.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Load recent searches from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('recentSearches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (query: string) => {
    if (!query.trim()) {
      onSearch('');
      return;
    }
    
    // Save to recent searches
    const updated = [query, ...recentSearches.filter(s => s !== query)].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem('recentSearches', JSON.stringify(updated));
    
    // Pass search query to parent
    onSearch(query);
    
    // Navigate to filtered results
    setShowSuggestions(false);
    const element = document.getElementById('destinations');
    element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const clearSearch = () => {
    setSearchQuery('');
    setShowSuggestions(false);
    onSearch('');
  };

  const handleInputChange = (value: string) => {
    setSearchQuery(value);
    setShowSuggestions(value.length > 0);
  };

  const selectSuggestion = (suggestion: string) => {
    setSearchQuery(suggestion);
    handleSearch(suggestion);
  };

  const text = {
    en: {
      title: 'Where would you like to explore?',
      placeholder: 'Search destinations, experiences, or attractions...',
      popular: 'Popular Searches',
      recent: 'Recent Searches',
      suggestions: 'Suggestions',
      noResults: 'No destinations found',
      clearRecent: 'Clear recent searches',
      searches: ['Al Jahili Fort', 'Al Bidya Mosque', 'Hatta Heritage Village', 'Al Fahidi District', 'Qasr Al Hosn']
    },
    ar: {
      title: 'أين تريد أن تستكشف؟',
      placeholder: 'ابحث عن الوجهات أو التجارب أو المعالم السياحية...',
      popular: 'عمليات البحث الشائعة',
      recent: 'عمليات البحث الأخيرة',
      suggestions: 'اقتراحات',
      noResults: 'لم يتم العثور على وجهات',
      clearRecent: 'مسح عمليات البحث الأخيرة',
      searches: ['قلعة الجاهلي', 'مسجد البدية', 'قرية حتا التراثية', 'حي الفهيدي', 'قصر الحصن']
    }
  };

  const isRTL = language === 'ar';

  return (
    <section id="search" className={`py-20 bg-gradient-to-b from-background to-muted/30 ${isRTL ? 'rtl' : ''}`}>
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8 gradient-text">
            {text[language].title}
          </h2>

          {/* Search Bar with Autocomplete */}
          <div ref={searchRef} className="relative mb-8">
            <div className="search-bar">
              <div className="flex items-center space-x-4">
                <Search className="w-6 h-6 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder={text[language].placeholder}
                  value={searchQuery}
                  onChange={(e) => handleInputChange(e.target.value)}
                  onFocus={() => setShowSuggestions(searchQuery.length > 0 || recentSearches.length > 0)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleSearch(searchQuery);
                    }
                  }}
                  className="flex-1 border-0 focus-visible:ring-0 text-lg"
                />
                {searchQuery && (
                  <button
                    onClick={clearSearch}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
                <Button 
                  onClick={() => handleSearch(searchQuery)}
                  className="btn-hero px-8"
                >
                  {language === 'en' ? 'Search' : 'بحث'}
                </Button>
              </div>
            </div>

            {/* Suggestions Dropdown */}
            {showSuggestions && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
                {/* Recent Searches */}
                {recentSearches.length > 0 && searchQuery.length === 0 && (
                  <div className="p-4 border-b border-border">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-sm font-semibold text-muted-foreground">{text[language].recent}</h4>
                      <button
                        onClick={() => {
                          setRecentSearches([]);
                          localStorage.removeItem('recentSearches');
                        }}
                        className="text-xs text-muted-foreground hover:text-foreground"
                      >
                        {text[language].clearRecent}
                      </button>
                    </div>
                    {recentSearches.map((search, idx) => (
                      <button
                        key={idx}
                        onClick={() => selectSuggestion(search)}
                        className="w-full text-left px-3 py-2 hover:bg-muted rounded-md flex items-center space-x-3 group"
                      >
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <span className="flex-1">{search}</span>
                      </button>
                    ))}
                  </div>
                )}

                {/* Filtered Suggestions */}
                {searchQuery.length > 0 && (
                  <div className="p-4">
                    <h4 className="text-sm font-semibold text-muted-foreground mb-3">{text[language].suggestions}</h4>
                    {filteredDestinations.length > 0 ? (
                      filteredDestinations.map((dest, idx) => (
                        <button
                          key={idx}
                          onClick={() => selectSuggestion(dest)}
                          className="w-full text-left px-3 py-2 hover:bg-muted rounded-md flex items-center space-x-3 group"
                        >
                          <MapPin className="w-4 h-4 text-primary" />
                          <span className="flex-1">{dest}</span>
                        </button>
                      ))
                    ) : (
                      <div className="text-center py-4 text-muted-foreground">
                        {text[language].noResults}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
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
                  onClick={() => selectSuggestion(search)}
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