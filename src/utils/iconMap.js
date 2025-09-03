import { 
  Award, 
  Trophy, 
  Star, 
  Medal, 
  Crown, 
  Shield, 
  Target, 
  Zap, 
  Heart, 
  Gem 
} from 'lucide-react';

// مجموعة الأيقونات الثابتة المتاحة
export const iconMap = {
  award: Award,
  trophy: Trophy,
  star: Star,
  medal: Medal,
  crown: Crown,
  shield: Shield,
  target: Target,
  zap: Zap,
  heart: Heart,
  gem: Gem,
};

// الألوان المتاحة للأيقونات
export const colorMap = {
  yellow: 'bg-yellow-500',
  blue: 'bg-blue-500',
  green: 'bg-green-500',
  purple: 'bg-purple-500',
  red: 'bg-red-500',
  indigo: 'bg-indigo-500',
  pink: 'bg-pink-500',
  orange: 'bg-orange-500',
  teal: 'bg-teal-500',
  cyan: 'bg-cyan-500',
};

// دالة للحصول على الأيقونة بناءً على الاسم
export const getIcon = (iconName) => {
  return iconMap[iconName] || Award; // Award كقيمة افتراضية
};

// دالة للحصول على اللون بناءً على الاسم
export const getColor = (colorName) => {
  return colorMap[colorName] || 'bg-gray-500'; // رمادي كقيمة افتراضية
};