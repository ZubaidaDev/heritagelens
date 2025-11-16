import { DestinationCard } from './DestinationCard';
import alJahiliFort from '@/assets/al-jahili-fort.jpg';
import alBidyaMosque from '@/assets/al-bidya-mosque.jpg';
import hattaHeritage from '@/assets/hatta-heritage.jpg';
import alFahidi from '@/assets/al-fahidi.jpg';

interface FeaturedDestinationsProps {
  language: 'en' | 'ar';
}

export const FeaturedDestinations = ({ language }: FeaturedDestinationsProps) => {
  const text = {
    en: {
      title: 'Featured Destinations',
      subtitle: 'Discover the most popular attractions in UAE'
    },
    ar: {
      title: 'الوجهات المميزة',
      subtitle: 'اكتشف المعالم السياحية الأكثر شعبية في دولة الإمارات'
    }
  };

  const destinations = {
    en: [
      {
        id: 1,
        name: 'Al Jahili Fort',
        location: 'Al Ain, Abu Dhabi',
        image: alJahiliFort,
        rating: 4.5,
        reviews: 2847,
        duration: '2-3 hours',
        price: 'AED 10',
        category: 'Historic Fort',
        description: 'One of the largest forts in Al Ain, built in 1891 to protect the city and its precious palm groves. Features stunning desert architecture and exhibits documenting the life of Sheikh Zayed.',
        aiTip: 'Best visited early morning or late afternoon to avoid heat. Free parking available. Photography enthusiasts will love the golden hour lighting on the fort walls.',
        amenities: ['Free Parking', 'Guided Tours', 'Gift Shop', 'Rest Areas', 'Wheelchair Access'],
        nearbyRestaurants: [
          { name: 'Mandi House', cuisine: 'Traditional Emirati', distance: '1.2 km' },
          { name: 'Al Mallah', cuisine: 'Arabic', distance: '800m' }
        ]
      },
      {
        id: 2,
        name: 'Al Bidya Mosque',
        location: 'Fujairah',
        image: alBidyaMosque,
        rating: 4.6,
        reviews: 1923,
        duration: '1 hour',
        price: 'Free',
        category: 'Historic Mosque',
        description: 'The oldest mosque in the UAE, dating back to 1446. Features unique mud-brick and stone construction with four distinctive domes. A hidden gem showcasing early Islamic architecture.',
        aiTip: 'Modest dress required. Remove shoes before entering. Visit during non-prayer times. Beautiful mountain backdrop perfect for photography.',
        amenities: ['Free Entry', 'Parking', 'Cultural Site', 'Historic Monument'],
        nearbyRestaurants: [
          { name: 'Sadaf Restaurant', cuisine: 'Seafood', distance: '5 km' },
          { name: 'Al Meshwar', cuisine: 'Lebanese', distance: '3.8 km' }
        ]
      },
      {
        id: 3,
        name: 'Hatta Heritage Village',
        location: 'Hatta, Dubai',
        image: hattaHeritage,
        rating: 4.4,
        reviews: 3118,
        duration: '2-3 hours',
        price: 'AED 5',
        category: 'Heritage Village',
        description: 'Restored mountain village showcasing traditional UAE life from centuries past. Explore ancient houses, defensive towers, and learn about falaj irrigation systems.',
        aiTip: 'Combine with Hatta Dam visit for a full day trip. Bring water as mountain climate can be warm. Traditional crafts demonstrations on weekends.',
        amenities: ['Museum', 'Traditional Houses', 'Fort', 'Parking', 'Visitor Center'],
        nearbyRestaurants: [
          { name: 'Hatta Fort Hotel Restaurant', cuisine: 'International', distance: '2 km' },
          { name: 'Damani Lodge', cuisine: 'Café', distance: '1.5 km' }
        ]
      },
      {
        id: 4,
        name: 'Al Fahidi Historical District',
        location: 'Bur Dubai',
        image: alFahidi,
        rating: 4.7,
        reviews: 5638,
        duration: '3-4 hours',
        price: 'Free',
        category: 'Historic Quarter',
        description: 'Dubai\'s oldest residential neighborhood with restored wind-tower houses, narrow lanes, and art galleries. Experience authentic old Dubai away from the modern skyline.',
        aiTip: 'Visit in the evening for cooler temperatures and atmospheric lighting. Many small museums and galleries inside. Arabic Coffee Museum is a must-visit.',
        amenities: ['Art Galleries', 'Museums', 'Traditional Cafés', 'Heritage Tours', 'Souvenir Shops'],
        nearbyRestaurants: [
          { name: 'Arabian Tea House', cuisine: 'Emirati', distance: '100m' },
          { name: 'XVA Café', cuisine: 'Organic/Vegetarian', distance: '150m' }
        ]
      }
    ],
    ar: [
      {
        id: 1,
        name: 'قلعة الجاهلي',
        location: 'العين، أبوظبي',
        image: alJahiliFort,
        rating: 4.5,
        reviews: 2847,
        duration: '٢-٣ ساعات',
        price: '١٠ درهم',
        category: 'قلعة تاريخية',
        description: 'واحدة من أكبر القلاع في العين، بنيت عام ١٨٩١ لحماية المدينة وبساتين النخيل الثمينة. تتميز بعمارة صحراوية مذهلة ومعارض توثق حياة الشيخ زايد.',
        aiTip: 'يفضل الزيارة في الصباح الباكر أو بعد العصر لتجنب الحرارة. موقف مجاني متاح. محبو التصوير سيحبون إضاءة الساعة الذهبية على جدران القلعة.',
        amenities: ['موقف مجاني', 'جولات مرشدة', 'محل هدايا', 'مناطق استراحة', 'مرافق للكراسي المتحركة'],
        nearbyRestaurants: [
          { name: 'بيت المندي', cuisine: 'إماراتي تقليدي', distance: '١.٢ كم' },
          { name: 'الملاح', cuisine: 'عربي', distance: '٨٠٠ م' }
        ]
      },
      {
        id: 2,
        name: 'مسجد البدية',
        location: 'الفجيرة',
        image: alBidyaMosque,
        rating: 4.6,
        reviews: 1923,
        duration: 'ساعة واحدة',
        price: 'مجاني',
        category: 'مسجد تاريخي',
        description: 'أقدم مسجد في الإمارات، يعود تاريخه إلى ١٤٤٦. يتميز ببناء فريد من الطوب الطيني والحجر مع أربع قباب مميزة. جوهرة مخفية تعرض العمارة الإسلامية المبكرة.',
        aiTip: 'يتطلب ملابس محتشمة. خلع الأحذية قبل الدخول. الزيارة خارج أوقات الصلاة. خلفية جبلية جميلة مثالية للتصوير.',
        amenities: ['دخول مجاني', 'موقف سيارات', 'موقع ثقافي', 'معلم تاريخي'],
        nearbyRestaurants: [
          { name: 'مطعم الصدف', cuisine: 'مأكولات بحرية', distance: '٥ كم' },
          { name: 'المشوار', cuisine: 'لبناني', distance: '٣.٨ كم' }
        ]
      },
      {
        id: 3,
        name: 'قرية حتا التراثية',
        location: 'حتا، دبي',
        image: hattaHeritage,
        rating: 4.4,
        reviews: 3118,
        duration: '٢-٣ ساعات',
        price: '٥ دراهم',
        category: 'قرية تراثية',
        description: 'قرية جبلية مرممة تعرض الحياة الإماراتية التقليدية من قرون مضت. استكشف البيوت القديمة والأبراج الدفاعية وتعلم عن نظام الفلج للري.',
        aiTip: 'يمكن الجمع مع زيارة سد حتا ليوم كامل. أحضر الماء حيث المناخ الجبلي قد يكون دافئاً. عروض الحرف التقليدية في عطلة نهاية الأسبوع.',
        amenities: ['متحف', 'بيوت تقليدية', 'قلعة', 'موقف سيارات', 'مركز زوار'],
        nearbyRestaurants: [
          { name: 'مطعم فندق حتا فورت', cuisine: 'عالمي', distance: '٢ كم' },
          { name: 'دماني لودج', cuisine: 'مقهى', distance: '١.٥ كم' }
        ]
      },
      {
        id: 4,
        name: 'حي الفهيدي التاريخي',
        location: 'بر دبي',
        image: alFahidi,
        rating: 4.7,
        reviews: 5638,
        duration: '٣-٤ ساعات',
        price: 'مجاني',
        category: 'حي تاريخي',
        description: 'أقدم حي سكني في دبي مع بيوت البراجيل المرممة والأزقة الضيقة والمعارض الفنية. جرب دبي القديمة الأصيلة بعيداً عن الأفق الحديث.',
        aiTip: 'قم بالزيارة في المساء للطقس الأبرد والإضاءة الجوية. العديد من المتاحف والمعارض الصغيرة في الداخل. متحف القهوة العربية يجب زيارته.',
        amenities: ['معارض فنية', 'متاحف', 'مقاهي تقليدية', 'جولات تراثية', 'محلات تذكارات'],
        nearbyRestaurants: [
          { name: 'بيت الشاي العربي', cuisine: 'إماراتي', distance: '١٠٠ م' },
          { name: 'مقهى XVA', cuisine: 'عضوي/نباتي', distance: '١٥٠ م' }
        ]
      }
    ]
  };

  const isRTL = language === 'ar';

  return (
    <section id="destinations" className={`py-20 bg-background ${isRTL ? 'rtl' : ''}`}>
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 gradient-text">
            {text[language].title}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {text[language].subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {destinations[language].map((destination, index) => (
            <div
              key={destination.id}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <DestinationCard destination={destination} language={language} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};