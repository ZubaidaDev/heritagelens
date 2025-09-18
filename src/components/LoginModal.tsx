import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Mail, Lock, User, Phone, Eye, EyeOff } from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: 'en' | 'ar';
}

export const LoginModal = ({ isOpen, onClose, language }: LoginModalProps) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    phone: ''
  });

  const text = {
    en: {
      login: 'Login',
      signup: 'Sign Up',
      welcome: 'Welcome Back',
      createAccount: 'Create Account',
      email: 'Email',
      password: 'Password',
      name: 'Full Name',
      phone: 'Phone Number',
      loginButton: 'Login',
      signupButton: 'Create Account',
      forgotPassword: 'Forgot Password?',
      noAccount: "Don't have an account?",
      haveAccount: 'Already have an account?',
      signupLink: 'Sign up',
      loginLink: 'Login',
      orContinueWith: 'Or continue with',
      google: 'Google',
      facebook: 'Facebook',
      apple: 'Apple',
      emailPlaceholder: 'Enter your email',
      passwordPlaceholder: 'Enter your password',
      namePlaceholder: 'Enter your full name',
      phonePlaceholder: 'Enter your phone number'
    },
    ar: {
      login: 'تسجيل الدخول',
      signup: 'إنشاء حساب',
      welcome: 'مرحباً بعودتك',
      createAccount: 'إنشاء حساب جديد',
      email: 'البريد الإلكتروني',
      password: 'كلمة المرور',
      name: 'الاسم الكامل',
      phone: 'رقم الهاتف',
      loginButton: 'تسجيل الدخول',
      signupButton: 'إنشاء حساب',
      forgotPassword: 'نسيت كلمة المرور؟',
      noAccount: 'ليس لديك حساب؟',
      haveAccount: 'لديك حساب بالفعل؟',
      signupLink: 'إنشاء حساب',
      loginLink: 'تسجيل الدخول',
      orContinueWith: 'أو تابع مع',
      google: 'جوجل',
      facebook: 'فيسبوك',
      apple: 'آبل',
      emailPlaceholder: 'أدخل بريدك الإلكتروني',
      passwordPlaceholder: 'أدخل كلمة المرور',
      namePlaceholder: 'أدخل اسمك الكامل',
      phonePlaceholder: 'أدخل رقم هاتفك'
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    onClose();
  };

  const isRTL = language === 'ar';

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={`sm:max-w-md ${isRTL ? 'rtl' : ''}`}>
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center gradient-text">
            {isSignUp ? text[language].createAccount : text[language].welcome}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Field (Sign Up Only) */}
          {isSignUp && (
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium">
                {text[language].name}
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder={text[language].namePlaceholder}
                  className="pl-10"
                  required
                />
              </div>
            </div>
          )}

          {/* Email Field */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium">
              {text[language].email}
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder={text[language].emailPlaceholder}
                className="pl-10"
                required
              />
            </div>
          </div>

          {/* Phone Field (Sign Up Only) */}
          {isSignUp && (
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-sm font-medium">
                {text[language].phone}
              </Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder={text[language].phonePlaceholder}
                  className="pl-10"
                  required
                />
              </div>
            </div>
          )}

          {/* Password Field */}
          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-medium">
              {text[language].password}
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                placeholder={text[language].passwordPlaceholder}
                className="pl-10 pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4 text-muted-foreground" />
                ) : (
                  <Eye className="w-4 h-4 text-muted-foreground" />
                )}
              </button>
            </div>
          </div>

          {/* Forgot Password (Login Only) */}
          {!isSignUp && (
            <div className="text-right">
              <button
                type="button"
                className="text-sm text-primary hover:underline"
              >
                {text[language].forgotPassword}
              </button>
            </div>
          )}

          {/* Submit Button */}
          <Button type="submit" className="w-full btn-hero">
            {isSignUp ? text[language].signupButton : text[language].loginButton}
          </Button>

          {/* Separator */}
          <div className="relative">
            <Separator />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="bg-background px-2 text-xs text-muted-foreground">
                {text[language].orContinueWith}
              </span>
            </div>
          </div>

          {/* Social Login */}
          <div className="grid grid-cols-3 gap-3">
            <Button type="button" variant="outline" className="w-full">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
            </Button>
            <Button type="button" variant="outline" className="w-full">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </Button>
            <Button type="button" variant="outline" className="w-full">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.219-.359-1.219c0-1.142.662-1.996 1.482-1.996.699 0 1.037.219 1.037 1.142 0 .696-.442 1.737-.219 2.699.199.842.842 1.482 1.663 1.482 1.996 0 3.537-2.104 3.537-5.142 0-2.699-1.937-4.579-4.695-4.579-3.198 0-5.079 2.404-5.079 4.895 0 .977.377 2.024.219 2.317-.199.377-.662.559-1.037.377-.377-.2-.599-.599-.599-1.199 0-1.142.842-2.541.842-3.397 0-1.861-1.304-3.279-3.358-3.279-2.317 0-4.174 1.663-4.174 4.174 0 .842.159 1.737.482 2.458l-1.304 5.52c-.379 1.599-.058 3.559.001 3.759.029.1.128.04.181-.059.079-.149 1.104-1.37 1.292-2.928.053-.442 1.37-5.361 1.37-5.361.681 1.301 2.67 2.447 4.786 2.447 6.314 0 10.604-5.75 10.604-13.442C23.033 5.734 18.036.029 12.017.029z"/>
              </svg>
            </Button>
          </div>

          {/* Toggle Login/Signup */}
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              {isSignUp ? text[language].haveAccount : text[language].noAccount}
              <button
                type="button"
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-primary hover:underline ml-1"
              >
                {isSignUp ? text[language].loginLink : text[language].signupLink}
              </button>
            </p>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};