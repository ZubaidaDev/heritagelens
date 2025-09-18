import { DestinationCard } from './DestinationCard';
import burjKhalifa from '@/assets/burj-khalifa.jpg';
import grandMosque from '@/assets/grand-mosque.jpg';
import desertSafari from '@/assets/desert-safari.jpg';
import burjAlArab from '@/assets/burj-al-arab.jpg';

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
        name: 'Burj Khalifa',
        location: 'Downtown Dubai',
        image: burjKhalifa,
        rating: 4.8,
        reviews: 12500,
        duration: '2-3 hours',
        price: 'From AED 149',
        category: 'Architecture',
        description: 'The world\'s tallest building offering breathtaking views of Dubai',
        aiTip: 'Best visited during sunset for stunning golden hour views. Book skip-the-line tickets in advance. Dress code applies for fine dining restaurants.',
        amenities: ['Observation Deck', 'Fine Dining', 'Gift Shop', 'Photography'],
        nearbyRestaurants: [
          { name: 'At.mosphere', cuisine: 'Fine Dining', distance: '0.1 km' },
          { name: 'Armani/Ristorante', cuisine: 'Italian', distance: '0.2 km' }
        ]
      },
      {
        id: 2,
        name: 'Sheikh Zayed Grand Mosque',
        location: 'Abu Dhabi',
        image: grandMosque,
        rating: 4.9,
        reviews: 8200,
        duration: '1.5-2 hours',
        price: 'Free',
        category: 'Religious & Cultural',
        description: 'Magnificent white mosque showcasing Islamic architecture',
        aiTip: 'Visit during early morning or late afternoon for best photography. Modest dress code required - abayas available for women. Free guided tours available.',
        amenities: ['Guided Tours', 'Prayer Halls', 'Library', 'Museum'],
        nearbyRestaurants: [
          { name: 'Emirates Palace Café', cuisine: 'Middle Eastern', distance: '5.2 km' },
          { name: 'Mezlai', cuisine: 'Emirati', distance: '5.8 km' }
        ]
      },
      {
        id: 3,
        name: 'Desert Safari',
        location: 'Dubai Desert',
        image: desertSafari,
        rating: 4.7,
        reviews: 15600,
        duration: '6-7 hours',
        price: 'From AED 280',
        category: 'Adventure',
        description: 'Thrilling desert adventure with dune bashing and cultural entertainment',
        aiTip: 'Evening safaris offer cooler weather and stunning sunsets. Wear comfortable clothes and closed shoes. Don\'t eat heavy meals before dune bashing.',
        amenities: ['Dune Bashing', 'Camel Riding', 'BBQ Dinner', 'Traditional Shows'],
        nearbyRestaurants: [
          { name: 'Desert Camp Restaurant', cuisine: 'BBQ', distance: '0 km' },
          { name: 'Bedouin Tent Dining', cuisine: 'Arabic', distance: '0 km' }
        ]
      },
      {
        id: 4,
        name: 'Burj Al Arab',
        location: 'Jumeirah Beach',
        image: burjAlArab,
        rating: 4.6,
        reviews: 6800,
        duration: '2-4 hours',
        price: 'From AED 500',
        category: 'Luxury Hotel',
        description: 'Iconic sail-shaped luxury hotel symbolizing Dubai\'s opulence',
        aiTip: 'Dining reservations required to access the hotel. Afternoon tea at Skyview Bar offers great views. Helicopter tours provide best exterior photos.',
        amenities: ['Luxury Dining', 'Spa Services', 'Beach Access', 'Helicopter Pad'],
        nearbyRestaurants: [
          { name: 'Al Mahara', cuisine: 'Seafood', distance: '0 km' },
          { name: 'Skyview Bar', cuisine: 'International', distance: '0 km' }
        ]
      }
    ],
    ar: [
      {
        id: 1,
        name: 'برج خليفة',
        location: 'وسط مدينة دبي',
        image: burjKhalifa,
        rating: 4.8,
        reviews: 12500,
        duration: '2-3 ساعات',
        price: 'من 149 درهم',
        category: 'العمارة',
        description: 'أطول مبنى في العالم يوفر إطلالات خلابة على دبي',
        aiTip: 'يفضل الزيارة عند غروب الشمس للحصول على إطلالات ذهبية مذهلة. احجز تذاكر تخطي الطابور مسبقاً. يطبق قانون اللباس في مطاعم الطعام الفاخر.',
        amenities: ['منصة المراقبة', 'مطاعم فاخرة', 'متجر الهدايا', 'التصوير'],
        nearbyRestaurants: [
          { name: 'أتموسفير', cuisine: 'طعام فاخر', distance: '0.1 كم' },
          { name: 'أرماني/ريستورانتي', cuisine: 'إيطالي', distance: '0.2 كم' }
        ]
      },
      {
        id: 2,
        name: 'مسجد الشيخ زايد الكبير',
        location: 'أبوظبي',
        image: grandMosque,
        rating: 4.9,
        reviews: 8200,
        duration: '1.5-2 ساعة',
        price: 'مجاني',
        category: 'ديني وثقافي',
        description: 'مسجد أبيض رائع يعرض العمارة الإسلامية',
        aiTip: 'زيارة في الصباح الباكر أو بعد الظهر المتأخر للحصول على أفضل صور. مطلوب لباس محتشم - عباءات متوفرة للنساء. جولات مجانية متاحة.',
        amenities: ['جولات مرشدة', 'قاعات الصلاة', 'مكتبة', 'متحف'],
        nearbyRestaurants: [
          { name: 'مقهى قصر الإمارات', cuisine: 'شرق أوسطي', distance: '5.2 كم' },
          { name: 'مزلاي', cuisine: 'إماراتي', distance: '5.8 كم' }
        ]
      },
      {
        id: 3,
        name: 'سفاري الصحراء',
        location: 'صحراء دبي',
        image: desertSafari,
        rating: 4.7,
        reviews: 15600,
        duration: '6-7 ساعات',
        price: 'من 280 درهم',
        category: 'مغامرة',
        description: 'مغامرة صحراوية مثيرة مع التزلج على الكثبان والترفيه الثقافي',
        aiTip: 'رحلات المساء توفر طقساً أبرد وغروب شمس مذهل. ارتدي ملابس مريحة وأحذية مغلقة. لا تتناول وجبات ثقيلة قبل التزلج على الكثبان.',
        amenities: ['التزلج على الكثبان', 'ركوب الجمال', 'عشاء شواء', 'عروض تقليدية'],
        nearbyRestaurants: [
          { name: 'مطعم المخيم الصحراوي', cuisine: 'شواء', distance: '0 كم' },
          { name: 'خيمة البدو للطعام', cuisine: 'عربي', distance: '0 كم' }
        ]
      },
      {
        id: 4,
        name: 'برج العرب',
        location: 'شاطئ جميرا',
        image: burjAlArab,
        rating: 4.6,
        reviews: 6800,
        duration: '2-4 ساعات',
        price: 'من 500 درهم',
        category: 'فندق فاخر',
        description: 'فندق فاخر أيقوني على شكل شراع يرمز إلى ثراء دبي',
        aiTip: 'مطلوب حجز لتناول الطعام للوصول إلى الفندق. شاي بعد الظهر في سكاي فيو بار يوفر إطلالات رائعة. جولات الهليكوبتر توفر أفضل صور خارجية.',
        amenities: ['مطاعم فاخرة', 'خدمات السبا', 'وصول للشاطئ', 'مهبط هليكوبتر'],
        nearbyRestaurants: [
          { name: 'المحارة', cuisine: 'مأكولات بحرية', distance: '0 كم' },
          { name: 'سكاي فيو بار', cuisine: 'عالمي', distance: '0 كم' }
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