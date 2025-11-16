import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { MessageCircle, Send, X, Bot, User, Sparkles } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

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
  const { toast } = useToast();

  const text = {
    en: {
      title: 'AI Travel Assistant',
      placeholder: 'Ask me anything about UAE...',
      send: 'Send',
      welcome: 'Ahlan! I\'m your AI travel assistant for UAE. I can help you with destinations, cultural insights, travel tips, and more. What would you like to know?',
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

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const messageText = inputValue;
    setInputValue('');
    setIsTyping(true);

    try {
      const { data, error } = await supabase.functions.invoke('chatbot', {
        body: { message: messageText, language }
      });

      if (error) {
        console.error('Edge function error:', error);
        throw error;
      }

      if (!data?.response) {
        throw new Error('No response from AI');
      }

      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: data.response,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botResponse]);
    } catch (error: any) {
      console.error('Chatbot error:', error);
      
      let errorMessage = language === 'ar' 
        ? 'عذراً، حدث خطأ. يرجى المحاولة مرة أخرى.'
        : 'Sorry, an error occurred. Please try again.';
      
      if (error.message?.includes('rate limit') || error.message?.includes('429')) {
        errorMessage = language === 'ar'
          ? 'تم تجاوز الحد المسموح. يرجى المحاولة بعد قليل.'
          : 'Rate limit exceeded. Please try again in a moment.';
      } else if (error.message?.includes('payment') || error.message?.includes('402')) {
        errorMessage = language === 'ar'
          ? 'خدمة الذكاء الاصطناعي تتطلب الدفع. يرجى التواصل مع الدعم.'
          : 'AI service requires payment. Please contact support.';
      }
      
      toast({
        title: language === 'ar' ? 'خطأ' : 'Error',
        description: errorMessage,
        variant: 'destructive',
      });
      
      const errorBotMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: errorMessage,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorBotMessage]);
    } finally {
      setIsTyping(false);
    }
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