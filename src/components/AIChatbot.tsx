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
      title: 'AI Cultural Guide',
      placeholder: 'Ask about UAE culture, history, traditions...',
      send: 'Send',
      welcome: 'Hello! I\'m your AI Cultural Guide for UAE. I specialize in sharing fascinating stories, cultural significance, and historical context of every site you visit. What cultural insights would you like to explore?',
      suggestions: [
        'Tell me about Emirati traditions',
        'What\'s the history behind Dubai\'s gold souk?',
        'Cultural significance of falcons in UAE',
        'Traditional Emirati architecture features'
      ]
    },
    ar: {
      title: 'الدليل الثقافي الذكي',
      placeholder: 'اسأل عن ثقافة وتاريخ وتقاليد الإمارات...',
      send: 'إرسال',
      welcome: 'مرحباً! أنا دليلك الثقافي الذكي لدولة الإمارات. أتخصص في مشاركة القصص الرائعة والأهمية الثقافية والسياق التاريخي لكل موقع تزوره. ما هي الرؤى الثقافية التي تريد استكشافها؟',
      suggestions: [
        'أخبرني عن التقاليد الإماراتية',
        'ما تاريخ سوق الذهب في دبي؟',
        'الأهمية الثقافية للصقور في الإمارات',
        'خصائص العمارة الإماراتية التقليدية'
      ]
    }
  };

  const simulateAIResponse = (userMessage: string): string => {
    const responses = {
      en: {
        default: "Fascinating question! UAE has a rich cultural tapestry woven from Bedouin traditions, pearl diving heritage, and Islamic values. Each emirate has unique cultural stories - from Dubai's transformation from fishing village to global hub, to Abu Dhabi's falcon heritage. What specific cultural aspect interests you most?",
        traditions: "Emirati traditions are deeply rooted in Bedouin culture and Islamic values. Key traditions include Majlis (gathering councils), falconry, camel racing, and traditional arts like Al Sadu weaving. Hospitality is paramount - guests are treated with utmost respect and offered dates, coffee, and frankincense.",
        architecture: "Traditional Emirati architecture features wind towers (Barjeel) for natural cooling, coral stone construction, and geometric Islamic patterns. Modern UAE brilliantly blends these with contemporary design - see how Burj Khalifa's Islamic geometric patterns honor tradition while reaching for the sky!",
        history: "Dubai's Gold Souk dates back to the 1940s when traders from Iran and India established businesses. It became a crucial trading hub due to Dubai's strategic location between East and West. The souk's traditional architecture with wooden beams reflects the merchant heritage of old Dubai.",
        culture: "UAE culture beautifully balances tradition with modernity. The falcon represents nobility, courage, and Bedouin heritage - it's even on the currency! Traditional sports include falconry, camel racing, and dhow sailing. Modern UAE celebrates 200+ nationalities while preserving Emirati identity.",
        food: "Emirati cuisine tells stories of the sea, desert, and trade routes. Al Harees symbolizes community (cooked collectively during Ramadan), Luqaimat represents celebration sweets, and traditional coffee ceremonies show hospitality. Each dish connects to Bedouin, Persian, and Indian influences through historical trade."
      },
      ar: {
        default: "سؤال ممتاز! بناءً على معرفتي بدولة الإمارات، أنصح بالتحقق من العادات المحلية والتخطيط لزيارتك خلال الأشهر الباردة (نوفمبر إلى مارس) للحصول على أفضل تجربة. هل تريد توصيات محددة لأي إمارة معينة؟",
        traditions: "التقاليد الإماراتية متجذرة عميقاً في ثقافة البدو والقيم الإسلامية. التقاليد الرئيسية تشمل المجالس، الصقارة، سباق الهجن، والفنون التقليدية مثل نسج السدو. الضيافة مقدسة - يُعامل الضيوف بأقصى درجات الاحترام ويُقدم لهم التمر والقهوة واللبان.",
        architecture: "العمارة الإماراتية التقليدية تتميز بأبراج الرياح (البرجيل) للتبريد الطبيعي، والبناء بالحجر المرجاني، والأنماط الهندسية الإسلامية. الإمارات الحديثة تمزج هذه بذكاء مع التصميم المعاصر - انظر كيف يكرم برج خليفة الأنماط الهندسية الإسلامية بينما يصل للسماء!",
        history: "سوق الذهب في دبي يعود إلى الأربعينيات عندما أسس التجار من إيران والهند أعمالهم. أصبح مركز تجاري مهم بسبب موقع دبي الاستراتيجي بين الشرق والغرب. عمارة السوق التقليدية بالعوارض الخشبية تعكس تراث التجار في دبي القديمة.",
        culture: "الثقافة الإماراتية تتوازن بشكل جميل بين التقليد والحداثة. الصقر يرمز للنبل والشجاعة والتراث البدوي - حتى أنه على العملة! الرياضات التقليدية تشمل الصقارة وسباق الهجن وسباق القوارب الشراعية. الإمارات الحديثة تحتفل بأكثر من 200 جنسية مع الحفاظ على الهوية الإماراتية.",
        food: "المطبخ الإماراتي يحكي قصص البحر والصحراء وطرق التجارة. الهريس يرمز للمجتمع (يُطبخ جماعياً في رمضان)، واللقيمات تمثل حلويات الاحتفال، وطقوس القهوة التقليدية تظهر الضيافة. كل طبق يتصل بتأثيرات البدو والفارسية والهندية من خلال التجارة التاريخية."
      }
    };

    const message = userMessage.toLowerCase();
    if (message.includes('tradition') || message.includes('التقاليد') || message.includes('bedouin') || message.includes('البدو')) {
      return responses[language].traditions;
    } else if (message.includes('architecture') || message.includes('العمارة') || message.includes('building') || message.includes('مبنى')) {
      return responses[language].architecture;
    } else if (message.includes('history') || message.includes('التاريخ') || message.includes('gold souk') || message.includes('سوق الذهب')) {
      return responses[language].history;
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