import { useState, useEffect } from 'react';
import { DestinationCard } from './DestinationCard';
import { supabase } from '@/integrations/supabase/client';
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
  searchQuery?: string;
}

export const FeaturedDestinations = ({ language, searchQuery = '' }: FeaturedDestinationsProps) => {
  const [userId, setUserId] = useState<string | null>(null);
  const [recommendedDestinations, setRecommendedDestinations] = useState<string[]>([]);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUserId(session?.user?.id || null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUserId(session?.user?.id || null);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!userId) return;

    const fetchPersonalizedRecommendations = async () => {
      try {
        // Get destinations from user's reviews
        const { data: reviews } = await supabase
          .from('reviews')
          .select('destination')
          .eq('user_id', userId);

        // Get locations from user's journals
        const { data: journals } = await supabase
          .from('journals')
          .select('location')
          .eq('user_id', userId);

        const userDestinations = new Set<string>();
        
        reviews?.forEach(r => {
          if (r.destination) userDestinations.add(r.destination);
        });
        
        journals?.forEach(j => {
          if (j.location) userDestinations.add(j.location);
        });

        setRecommendedDestinations(Array.from(userDestinations));
      } catch (error) {
        console.error('Error fetching personalized recommendations:', error);
      }
    };

    fetchPersonalizedRecommendations();
  }, [userId]);

  const text = {
    en: {
      title: 'Featured Destinations',
      subtitle: 'Discover cultural attractions in UAE',
      recommendedTitle: 'Recommended For You',
      recommendedSubtitle: 'Based on your reviews and journals'
    },
    ar: {
      title: 'الوجهات المميزة',
      subtitle: 'اكتشف المعالم الثقافية في دولة الإمارات',
      recommendedTitle: 'موصى بها لك',
      recommendedSubtitle: 'بناءً على تقييماتك ومذكراتك'
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
      },
      {
        id: 9,
        name: 'Al Ain Oasis',
        location: 'Al Ain, Abu Dhabi',
        image: hattaHeritage,
        rating: 4.7,
        reviews: 3421,
        duration: '2-3 hours',
        price: 'Free',
        category: 'UNESCO Heritage Site',
        description: 'Ancient oasis with 147,000 date palms fed by traditional falaj irrigation system. UNESCO World Heritage Site showcasing 4,000 years of agricultural tradition. Peaceful shaded walkways through historic palm groves.',
        aiTip: 'Visit early morning for best light and cooler temperatures. Free guided tours available. Eco-Centre provides insights into falaj system. Wear comfortable walking shoes.',
        amenities: ['Free Entry', 'Eco Centre', 'Walking Trails', 'Shaded Paths', 'Heritage Site'],
        nearbyRestaurants: [
          { name: 'Min Zaman', cuisine: 'Traditional Emirati', distance: '2 km' },
          { name: 'Al Diwan Restaurant', cuisine: 'Arabic', distance: '1.8 km' }
        ]
      },
      {
        id: 10,
        name: 'Umm Al Quwain Old Town',
        location: 'Umm Al Quwain',
        image: alFahidi,
        rating: 4.3,
        reviews: 654,
        duration: '2-4 hours',
        price: 'Free',
        category: 'Historic Town',
        description: 'Undiscovered gem with traditional coral stone houses, old fort, and dhow-building yards. Experience authentic UAE away from tourist crowds. Historic fort offers panoramic views of the creek.',
        aiTip: 'Perfect for photography enthusiasts. Visit dhow yards to see traditional boat building. Old souq still operates with local crafts. Best visited October to March.',
        amenities: ['Historic Fort', 'Traditional Souq', 'Dhow Yards', 'Free Parking', 'Scenic Views'],
        nearbyRestaurants: [
          { name: 'Umm Al Quwain Fort Restaurant', cuisine: 'Local', distance: '500m' },
          { name: 'Creek Side Café', cuisine: 'Seafood', distance: '300m' }
        ]
      },
      {
        id: 11,
        name: 'Jebel Hafeet',
        location: 'Al Ain, Abu Dhabi',
        image: desertSafari,
        rating: 4.8,
        reviews: 5234,
        duration: '3-4 hours',
        price: 'Free',
        category: 'Natural Landmark',
        description: 'UAE\'s second highest peak at 1,240 meters with stunning mountain road featuring 60 turns. Ancient beehive tombs at base dating back 5,000 years. Spectacular sunrise and sunset views.',
        aiTip: 'Drive up early morning or evening for best temperatures. Mercure Hotel at summit offers refreshments. Visit Bronze Age tombs at foothills. Bring water and camera.',
        amenities: ['Scenic Drive', 'Archaeological Sites', 'Mountain Hotel', 'Viewpoints', 'Free Access'],
        nearbyRestaurants: [
          { name: 'Mercure Grand Jebel Hafeet', cuisine: 'International', distance: 'At Summit' },
          { name: 'Green Mubazzarah Café', cuisine: 'Café', distance: 'At Base' }
        ]
      },
      {
        id: 12,
        name: 'Kalba Corniche & Mangroves',
        location: 'Kalba, Sharjah',
        image: alBidyaMosque,
        rating: 4.5,
        reviews: 1876,
        duration: '2-3 hours',
        price: 'AED 20 (Kayak)',
        category: 'Natural Reserve',
        description: 'Oldest mangrove forest in Arabia, home to rare white collared kingfisher. Kayak through peaceful waterways rich with marine life. Khor Kalba Conservation Reserve protects diverse ecosystems.',
        aiTip: 'Morning kayaking offers best wildlife spotting. Bring binoculars for birdwatching. Guided eco-tours available. Wear sun protection and water shoes.',
        amenities: ['Kayak Rentals', 'Bird Watching', 'Eco Tours', 'Visitor Center', 'Beach Access'],
        nearbyRestaurants: [
          { name: 'Kalba Beach Restaurant', cuisine: 'Seafood', distance: '1 km' },
          { name: 'Mangrove Café', cuisine: 'International', distance: '500m' }
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
      },
      {
        id: 9,
        name: 'واحة العين',
        location: 'العين، أبوظبي',
        image: hattaHeritage,
        rating: 4.7,
        reviews: 3421,
        duration: '٢-٣ ساعات',
        price: 'مجاني',
        category: 'موقع تراث عالمي',
        description: 'واحة قديمة تضم ١٤٧,٠٠٠ نخلة تروى بنظام الفلج التقليدي. موقع تراث عالمي لليونسكو يعرض ٤,٠٠٠ سنة من التقاليد الزراعية. ممرات مظللة هادئة عبر بساتين النخيل التاريخية.',
        aiTip: 'قم بالزيارة في الصباح الباكر للإضاءة الأفضل ودرجات حرارة أبرد. جولات مرشدة مجانية متاحة. المركز البيئي يوفر رؤى حول نظام الفلج. ارتدِ أحذية مشي مريحة.',
        amenities: ['دخول مجاني', 'مركز بيئي', 'مسارات مشي', 'ممرات مظللة', 'موقع تراثي'],
        nearbyRestaurants: [
          { name: 'من زمان', cuisine: 'إماراتي تقليدي', distance: '٢ كم' },
          { name: 'مطعم الديوان', cuisine: 'عربي', distance: '١.٨ كم' }
        ]
      },
      {
        id: 10,
        name: 'البلدة القديمة في أم القيوين',
        location: 'أم القيوين',
        image: alFahidi,
        rating: 4.3,
        reviews: 654,
        duration: '٢-٤ ساعات',
        price: 'مجاني',
        category: 'بلدة تاريخية',
        description: 'جوهرة غير مكتشفة مع بيوت حجرية مرجانية تقليدية، قلعة قديمة، وأحواض بناء الداو. جرب الإمارات الأصيلة بعيداً عن حشود السياح. القلعة التاريخية توفر إطلالات بانورامية على الخور.',
        aiTip: 'مثالي لعشاق التصوير. قم بزيارة أحواض الداو لرؤية بناء القوارب التقليدية. السوق القديم لا يزال يعمل مع الحرف المحلية. أفضل زيارة من أكتوبر إلى مارس.',
        amenities: ['قلعة تاريخية', 'سوق تقليدي', 'أحواض الداو', 'موقف مجاني', 'مناظر خلابة'],
        nearbyRestaurants: [
          { name: 'مطعم قلعة أم القيوين', cuisine: 'محلي', distance: '٥٠٠ م' },
          { name: 'مقهى جانب الخور', cuisine: 'مأكولات بحرية', distance: '٣٠٠ م' }
        ]
      },
      {
        id: 11,
        name: 'جبل حفيت',
        location: 'العين، أبوظبي',
        image: desertSafari,
        rating: 4.8,
        reviews: 5234,
        duration: '٣-٤ ساعات',
        price: 'مجاني',
        category: 'معلم طبيعي',
        description: 'ثاني أعلى قمة في الإمارات بارتفاع ١,٢٤٠ متر مع طريق جبلي مذهل يحتوي على ٦٠ منعطف. مقابر خلية النحل القديمة في القاعدة يعود تاريخها إلى ٥,٠٠٠ سنة. مناظر شروق وغروب رائعة.',
        aiTip: 'قُد السيارة في الصباح الباكر أو المساء لأفضل درجات الحرارة. فندق ميركيور في القمة يقدم المرطبات. قم بزيارة مقابر العصر البرونزي عند السفوح. أحضر الماء والكاميرا.',
        amenities: ['قيادة خلابة', 'مواقع أثرية', 'فندق جبلي', 'نقاط مراقبة', 'دخول مجاني'],
        nearbyRestaurants: [
          { name: 'ميركيور جراند جبل حفيت', cuisine: 'عالمي', distance: 'في القمة' },
          { name: 'مقهى جرين مبزرة', cuisine: 'مقهى', distance: 'في القاعدة' }
        ]
      },
      {
        id: 12,
        name: 'كورنيش كلباء والمنغروف',
        location: 'كلباء، الشارقة',
        image: alBidyaMosque,
        rating: 4.5,
        reviews: 1876,
        duration: '٢-٣ ساعات',
        price: '٢٠ درهم (كاياك)',
        category: 'محمية طبيعية',
        description: 'أقدم غابة منغروف في الجزيرة العربية، موطن صياد السمك أبيض الطوق النادر. اركب الكاياك عبر الممرات المائية الهادئة الغنية بالحياة البحرية. محمية خور كلباء تحمي النظم البيئية المتنوعة.',
        aiTip: 'ركوب الكاياك الصباحي يوفر أفضل فرص رؤية الحياة البرية. أحضر منظار لمراقبة الطيور. جولات بيئية مرشدة متاحة. ارتدِ واقي شمس وأحذية مائية.',
        amenities: ['إيجار كاياك', 'مراقبة الطيور', 'جولات بيئية', 'مركز زوار', 'شاطئ'],
        nearbyRestaurants: [
          { name: 'مطعم شاطئ كلباء', cuisine: 'مأكولات بحرية', distance: '١ كم' },
          { name: 'مقهى المنغروف', cuisine: 'عالمي', distance: '٥٠٠ م' }
        ]
      }
    ]
  };

  const isRTL = language === 'ar';

  // Filter destinations based on search query
  const filteredDestinations = searchQuery
    ? destinations[language].filter(dest =>
        dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dest.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dest.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : destinations[language];

  return (
    <section id="destinations" className={`py-20 bg-background ${isRTL ? 'rtl' : ''}`}>
      <div className="container mx-auto px-6">
        {/* Personalized Recommendations */}
        {userId && recommendedDestinations.length > 0 && (
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-2 gradient-text">
                {text[language].recommendedTitle}
              </h2>
              <p className="text-lg text-muted-foreground">
                {text[language].recommendedSubtitle}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-8">
              {destinations[language]
                .filter(dest => recommendedDestinations.some(rec => 
                  dest.name.includes(rec) || rec.includes(dest.name)
                ))
                .slice(0, 3)
                .map((destination, index) => (
                  <div
                    key={`recommended-${destination.id}`}
                    className="animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <DestinationCard destination={destination} language={language} />
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Main Featured Destinations */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 gradient-text">
            {text[language].title}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {searchQuery 
              ? `${filteredDestinations.length} ${language === 'en' ? 'results for' : 'نتيجة لـ'} "${searchQuery}"`
              : text[language].subtitle
            }
          </p>
        </div>

        {filteredDestinations.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {filteredDestinations.map((destination, index) => (
              <div
                key={destination.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <DestinationCard destination={destination} language={language} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-xl text-muted-foreground">
              {language === 'en' 
                ? `No destinations found for "${searchQuery}"` 
                : `لم يتم العثور على وجهات لـ "${searchQuery}"`
              }
            </p>
          </div>
        )}
      </div>
    </section>
  );
};