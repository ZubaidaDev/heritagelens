import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { MessageCircle, Send, X, Bot, User, Sparkles } from 'lucide-react';

interface AIChatbotProps {
  language: 'en' | 'ar';
}

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

export const AIChatbot = ({ language }: AIChatbotProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const text = {
    en: {
      title: 'AI Travel Assistant',
      placeholder: 'Ask me anything about UAE...',
      send: 'Send',
      welcome: 'Hello! I\'m your AI travel assistant for UAE. I can help you with destinations, cultural insights, travel tips, and more. What would you like to know?',
      suggestions: [
        'Best time to visit Dubai?',
        'Cultural etiquette in UAE',
        'Must-try Emirati food',
        'Desert safari recommendations'
      ]
    },
    ar: {
      title: 'مساعد السفر الذكي',
      placeholder: 'اسألني أي شيء عن دولة الإمارات...',
      send: 'إرسال',
      welcome: 'مرحباً! أنا مساعدك الذكي للسفر في دولة الإمارات. يمكنني مساعدتك في الوجهات والمعلومات الثقافية ونصائح السفر والمزيد. ماذا تريد أن تعرف؟',
      suggestions: [
        'أفضل وقت لزيارة دبي؟',
        'آداب الثقافة في الإمارات',
        'الأطعمة الإماراتية التي يجب تجربتها',
        'توصيات سفاري الصحراء'
      ]
    }
  };

  const simulateAIResponse = (userMessage: string): string => {
    const responses = {
      en: {
        default: "That's a great question! Based on my knowledge of UAE, I'd recommend checking out the local customs and planning your visit during the cooler months (November to March) for the best experience. Would you like specific recommendations for any particular emirate?",
        weather: "The best time to visit UAE is from November to March when temperatures are pleasant (20-30°C). Avoid summer months (June-September) as it can get extremely hot (40-50°C). Winter is perfect for outdoor activities!",
        culture: "UAE is a respectful and welcoming country. Dress modestly in public areas, especially at religious sites. Friday is the holy day. Tipping 10-15% is common. Arabic is official but English is widely spoken.",
        food: "Must-try Emirati dishes include Al Harees, Machboos, Luqaimat, and Shawarma. Visit local markets like Gold Souk and spice markets. Don't miss traditional Arabic coffee and dates!"
      },
      ar: {
        default: "سؤال ممتاز! بناءً على معرفتي بدولة الإمارات، أنصح بالتحقق من العادات المحلية والتخطيط لزيارتك خلال الأشهر الباردة (نوفمبر إلى مارس) للحصول على أفضل تجربة. هل تريد توصيات محددة لأي إمارة معينة؟",
        weather: "أفضل وقت لزيارة الإمارات من نوفمبر إلى مارس عندما تكون درجات الحرارة لطيفة (20-30 درجة). تجنب أشهر الصيف (يونيو-سبتمبر) حيث يمكن أن تصبح حارة جداً (40-50 درجة). الشتاء مثالي للأنشطة الخارجية!",
        culture: "الإمارات دولة محترمة ومرحبة. البس بتواضع في الأماكن العامة، خاصة في المواقع الدينية. الجمعة هو اليوم المقدس. الإكرامية 10-15% شائعة. العربية رسمية لكن الإنجليزية منتشرة.",
        food: "الأطباق الإماراتية التي يجب تجربتها تشمل الهريس والمجبوس واللقيمات والشاورما. زيارة الأسواق المحلية مثل سوق الذهب وأسواق البهارات. لا تفوت القهوة العربية التقليدية والتمر!"
      }
    };

    const message = userMessage.toLowerCase();
    if (message.includes('weather') || message.includes('time') || message.includes('الطقس') || message.includes('وقت')) {
      return responses[language].weather;
    } else if (message.includes('culture') || message.includes('custom') || message.includes('الثقافة') || message.includes('العادات')) {
      return responses[language].culture;
    } else if (message.includes('food') || message.includes('eat') || message.includes('الطعام') || message.includes('أكل')) {
      return responses[language].food;
    }
    return responses[language].default;
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: simulateAIResponse(inputValue),
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
  };

  const initializeChat = () => {
    if (messages.length === 0) {
      const welcomeMessage: Message = {
        id: '0',
        type: 'bot',
        content: text[language].welcome,
        timestamp: new Date()
      };
      setMessages([welcomeMessage]);
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      initializeChat();
    }
  };

  const isRTL = language === 'ar';

  return (
    <>
      {/* Chat Button */}
      <div className="chatbot-container">
        <Button
          onClick={toggleChat}
          className="chatbot-bubble w-14 h-14"
          size="lg"
        >
          {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
        </Button>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className={`fixed bottom-24 right-6 w-96 max-w-[calc(100vw-3rem)] h-[500px] z-40 animate-scale-in ${isRTL ? 'rtl' : ''}`}>
          <Card className="h-full flex flex-col shadow-floating border border-border/50">
            {/* Header */}
            <div className="p-4 border-b border-border bg-gradient-hero rounded-t-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">{text[language].title}</h3>
                  <div className="flex items-center space-x-1">
                    <Sparkles className="w-3 h-3 text-white/80" />
                    <span className="text-xs text-white/80">
                      {language === 'en' ? 'Online' : 'متصل'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className="flex items-start space-x-2 max-w-[80%]">
                    {message.type === 'bot' && (
                      <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center flex-shrink-0 mt-1">
                        <Bot className="w-3 h-3 text-primary-foreground" />
                      </div>
                    )}
                    <div
                      className={`p-3 rounded-2xl ${
                        message.type === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-muted-foreground'
                      }`}
                    >
                      <p className="text-sm leading-relaxed">{message.content}</p>
                    </div>
                    {message.type === 'user' && (
                      <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center flex-shrink-0 mt-1">
                        <User className="w-3 h-3 text-muted-foreground" />
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex items-start space-x-2">
                    <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                      <Bot className="w-3 h-3 text-primary-foreground" />
                    </div>
                    <div className="bg-muted p-3 rounded-2xl">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse"></div>
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Suggestions */}
              {messages.length === 1 && (
                <div className="space-y-2">
                  <p className="text-xs text-muted-foreground text-center">
                    {language === 'en' ? 'Try asking:' : 'جرب السؤال:'}
                  </p>
                  <div className="space-y-2">
                    {text[language].suggestions.map((suggestion, index) => (
                      <button
                        key={index}
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="w-full text-left p-2 rounded-lg bg-muted/50 hover:bg-muted text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-border">
              <div className="flex space-x-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={text[language].placeholder}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1"
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isTyping}
                  size="sm"
                  className="px-3"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </>
  );
};