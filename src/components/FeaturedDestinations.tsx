import { DestinationCard } from './DestinationCard';
import alJahiliFort from '@/assets/al-jahili-fort.jpg';
import alBidyaMosque from '@/assets/al-bidya-mosque.jpg';
import hattaHeritage from '@/assets/hatta-heritage.jpg';
import alFahidi from '@/assets/al-fahidi.jpg';
import burjKhalifa from '@/assets/burj-khalifa.jpg';
import burjAlArab from '@/assets/burj-al-arab.jpg';
import grandMosque from '@/assets/grand-mosque.jpg';
import desertSafari from '@/assets/desert-safari.jpg';

interface FeaturedDestinationsProps {
  language: 'en' | 'ar';
}

export const FeaturedDestinations = ({ language }: FeaturedDestinationsProps) => {
  const text = {
    en: {
      title: 'Featured Destinations',
      subtitle: 'Discover cultural attractions in UAE'
    },
    ar: {
      title: 'الوجهات المميزة',
      subtitle: 'اكتشف المعالم الثقافية في دولة الإمارات'
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
      },
      {
        id: 5,
        name: 'Qasr Al Hosn',
        location: 'Abu Dhabi',
        image: alJahiliFort,
        rating: 4.6,
        reviews: 1245,
        duration: '2-3 hours',
        price: 'AED 30',
        category: 'Historic Fort',
        description: 'Abu Dhabi\'s oldest stone building, dating back to 1760s. Originally a watchtower protecting a freshwater well, it became the royal palace and seat of government. Now a museum showcasing Emirati heritage.',
        aiTip: 'Visit during weekdays for fewer crowds. Guided tours available in multiple languages. Excellent traditional architecture photography. Cool interiors provide respite from heat.',
        amenities: ['Museum', 'Guided Tours', 'Exhibitions', 'Café', 'Gift Shop'],
        nearbyRestaurants: [
          { name: 'Al Fanar Restaurant', cuisine: 'Traditional Emirati', distance: '2 km' },
          { name: 'Majlis Café', cuisine: 'Arabic', distance: '1.5 km' }
        ]
      },
      {
        id: 6,
        name: 'Sheikh Zayed Grand Mosque',
        location: 'Abu Dhabi',
        image: grandMosque,
        rating: 4.9,
        reviews: 15782,
        duration: '2-3 hours',
        price: 'Free',
        category: 'Grand Mosque',
        description: 'One of the world\'s largest mosques, accommodating over 40,000 worshippers. Features 82 domes, over 1,000 columns, and the world\'s largest hand-knotted carpet. Stunning white marble architecture.',
        aiTip: 'Modest dress mandatory - abayas provided for women. Free guided tours available. Visit during evening for beautiful lighting. Remove shoes before entering. Non-prayer hours only.',
        amenities: ['Free Entry', 'Guided Tours', 'Visitor Center', 'Prayer Halls', 'Gardens'],
        nearbyRestaurants: [
          { name: 'Mezlai', cuisine: 'Emirati', distance: '15 km' },
          { name: 'Li Beirut', cuisine: 'Lebanese', distance: '12 km' }
        ]
      },
      {
        id: 7,
        name: 'Mleiha Archaeological Centre',
        location: 'Sharjah',
        image: hattaHeritage,
        rating: 4.5,
        reviews: 892,
        duration: '3-4 hours',
        price: 'AED 25',
        category: 'Archaeological Site',
        description: 'Ancient archaeological site with tombs and artifacts dating back 130,000 years. Features fossils, Stone Age tools, and Bronze Age tombs. Desert activities like camel trekking and stargazing available.',
        aiTip: 'Combine museum visit with desert activities. Best visited October-April for pleasant weather. Bring hiking shoes for tomb trail. Night camping experiences available.',
        amenities: ['Museum', 'Desert Activities', 'Fossil Sites', 'Café', 'Adventure Tours'],
        nearbyRestaurants: [
          { name: 'Mleiha Desert Café', cuisine: 'International', distance: 'On-site' },
          { name: 'Fossil Rock Café', cuisine: 'Café', distance: '5 km' }
        ]
      },
      {
        id: 8,
        name: 'Sharjah Heritage Area',
        location: 'Heart of Sharjah',
        image: alFahidi,
        rating: 4.6,
        reviews: 2134,
        duration: '3-5 hours',
        price: 'AED 15',
        category: 'Heritage Quarter',
        description: 'Beautifully restored traditional neighborhood with museums, souqs, and coral-stone houses. Includes Bait Al Naboodah, heritage museums, and traditional crafts workshops. Step back into 1950s Arabia.',
        aiTip: 'Start at Visitor Center for orientation. Visit multiple museums with combined ticket. Traditional workshops offer hands-on experiences. Evening visits offer cooler weather and ambient lighting.',
        amenities: ['Museums', 'Traditional Souq', 'Art Galleries', 'Craft Workshops', 'Cafés'],
        nearbyRestaurants: [
          { name: 'Al Fanar Restaurant', cuisine: 'Emirati', distance: '500m' },
          { name: 'Shababeek Restaurant', cuisine: 'Traditional', distance: '300m' }
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
      },
      {
        id: 5,
        name: 'قصر الحصن',
        location: 'أبوظبي',
        image: alJahiliFort,
        rating: 4.6,
        reviews: 1245,
        duration: '٢-٣ ساعات',
        price: '٣٠ درهم',
        category: 'قلعة تاريخية',
        description: 'أقدم مبنى حجري في أبوظبي، يعود تاريخه إلى ستينيات القرن الثامن عشر. كان في الأصل برج مراقبة يحمي بئر مياه عذبة، ثم أصبح القصر الملكي ومقر الحكومة. الآن متحف يعرض التراث الإماراتي.',
        aiTip: 'قم بالزيارة خلال أيام الأسبوع لتجنب الازدحام. جولات مرشدة متاحة بعدة لغات. تصوير معماري تقليدي ممتاز. الداخل البارد يوفر الراحة من الحرارة.',
        amenities: ['متحف', 'جولات مرشدة', 'معارض', 'مقهى', 'محل هدايا'],
        nearbyRestaurants: [
          { name: 'مطعم الفنر', cuisine: 'إماراتي تقليدي', distance: '٢ كم' },
          { name: 'مقهى المجلس', cuisine: 'عربي', distance: '١.٥ كم' }
        ]
      },
      {
        id: 6,
        name: 'مسجد الشيخ زايد الكبير',
        location: 'أبوظبي',
        image: grandMosque,
        rating: 4.9,
        reviews: 15782,
        duration: '٢-٣ ساعات',
        price: 'مجاني',
        category: 'مسجد كبير',
        description: 'واحد من أكبر المساجد في العالم، يستوعب أكثر من ٤٠,٠٠٠ مصلي. يحتوي على ٨٢ قبة، أكثر من ١,٠٠٠ عمود، وأكبر سجادة مصنوعة يدوياً في العالم. عمارة رخامية بيضاء مذهلة.',
        aiTip: 'اللباس المحتشم إلزامي - عباءات متوفرة للنساء. جولات مرشدة مجانية متاحة. قم بالزيارة مساءً للإضاءة الجميلة. خلع الأحذية قبل الدخول. خارج أوقات الصلاة فقط.',
        amenities: ['دخول مجاني', 'جولات مرشدة', 'مركز زوار', 'قاعات صلاة', 'حدائق'],
        nearbyRestaurants: [
          { name: 'مزلاي', cuisine: 'إماراتي', distance: '١٥ كم' },
          { name: 'لي بيروت', cuisine: 'لبناني', distance: '١٢ كم' }
        ]
      },
      {
        id: 7,
        name: 'مركز مليحة الأثري',
        location: 'الشارقة',
        image: hattaHeritage,
        rating: 4.5,
        reviews: 892,
        duration: '٣-٤ ساعات',
        price: '٢٥ درهم',
        category: 'موقع أثري',
        description: 'موقع أثري قديم مع مقابر وأدوات تعود إلى ١٣٠,٠٠٠ سنة. يحتوي على حفريات، أدوات العصر الحجري، ومقابر العصر البرونزي. أنشطة صحراوية مثل ركوب الجمال ومراقبة النجوم متاحة.',
        aiTip: 'اجمع زيارة المتحف مع الأنشطة الصحراوية. أفضل زيارة من أكتوبر-أبريل للطقس اللطيف. أحضر أحذية المشي لمسار المقابر. تجارب التخييم الليلي متاحة.',
        amenities: ['متحف', 'أنشطة صحراوية', 'مواقع الحفريات', 'مقهى', 'جولات مغامرة'],
        nearbyRestaurants: [
          { name: 'مقهى مليحة الصحراوي', cuisine: 'عالمي', distance: 'في الموقع' },
          { name: 'مقهى صخرة الحفريات', cuisine: 'مقهى', distance: '٥ كم' }
        ]
      },
      {
        id: 8,
        name: 'منطقة الشارقة التراثية',
        location: 'قلب الشارقة',
        image: alFahidi,
        rating: 4.6,
        reviews: 2134,
        duration: '٣-٥ ساعات',
        price: '١٥ درهم',
        category: 'حي تراثي',
        description: 'حي تقليدي مرمم بشكل جميل مع متاحف، أسواق، وبيوت حجرية مرجانية. يشمل بيت النابودة، متاحف التراث، وورش الحرف التقليدية. عد بالزمن إلى خمسينيات الجزيرة العربية.',
        aiTip: 'ابدأ من مركز الزوار للتوجيه. قم بزيارة متاحف متعددة بتذكرة مشتركة. الورش التقليدية تقدم تجارب عملية. الزيارات المسائية توفر طقس أبرد وإضاءة محيطة.',
        amenities: ['متاحف', 'سوق تقليدي', 'معارض فنية', 'ورش حرفية', 'مقاهي'],
        nearbyRestaurants: [
          { name: 'مطعم الفنر', cuisine: 'إماراتي', distance: '٥٠٠ م' },
          { name: 'مطعم شبابيك', cuisine: 'تقليدي', distance: '٣٠٠ م' }
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