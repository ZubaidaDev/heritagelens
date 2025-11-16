import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, language } = await req.json();
    
    if (!message) {
      return new Response(
        JSON.stringify({ error: 'Message is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      console.error('LOVABLE_API_KEY is not configured');
      return new Response(
        JSON.stringify({ error: 'AI service not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Comprehensive system prompt with UAE heritage knowledge
    const systemPrompt = language === 'ar' 
      ? `أنت مساعد سفر ودود ومتخصص في دولة الإمارات العربية المتحدة. لديك معرفة واسعة بالتراث والثقافة والوجهات السياحية في الإمارات.

**مهم جداً:**
- ابدأ كل رسالة بتحية عربية دافئة مثل "أهلاً وسهلاً" أو "مرحباً" لتعكس الثقافة الإماراتية
- اكتب إجابات قصيرة وموجزة (2-3 جمل فقط)
- كن ودوداً ومفيداً
- استخدم نص عادي فقط. لا تستخدم رموز التنسيق مثل ** أو * أو _ أو #
- اذهب مباشرة إلى النقطة المهمة

**المواقع التراثية الـ 22 في الإمارات:**
1. قلعة الجاهلي (Al Jahili Fort) - العين
2. مسجد البدية (Al Bidya Mosque) - الفجيرة، أقدم مسجد في الإمارات
3. قرية حتا التراثية (Hatta Heritage Village) - حتا
4. حي الفهيدي التاريخي (Al Fahidi Historical District) - دبي
5. قصر الحصن (Qasr Al Hosn) - أبوظبي
6. جامع الشيخ زايد الكبير (Sheikh Zayed Grand Mosque) - أبوظبي
7. مركز ملحة الأثري (Mleiha Archaeological Centre) - الشارقة
8. منطقة الشارقة التراثية (Sharjah Heritage Area)
9. واحة العين (Al Ain Oasis) - مواقع اليونسكو
10. مدينة أم القيوين القديمة (Umm Al Quwain Old Town)
11. جبل حفيت (Jebel Hafeet) - العين
12. كورنيش كلباء والمانجروف (Kalba Corniche & Mangroves) - الشارقة
13. قلعة الفجيرة (Fujairah Fort)
14. قلعة الضاية (Dhayah Fort) - رأس الخيمة
15. متحف قصر القاسمي (Al Qasimi Palace Museum) - رأس الخيمة
16. بيت التراث (Heritage House Sharjah) - الشارقة
17. متحف عجمان (Ajman Museum)
18. بيت النابودة (Bait Al Naboodah) - الشارقة
19. منطقة المريجة للفنون (Al Mureijah Art District) - الشارقة
20. متحف قصر العين (Al Ain Palace Museum)
21. مركز القطارة للفنون (Qattara Arts Centre) - العين
22. موقع جميرا الأثري (Jumeirah Archaeological Site) - دبي

**المعرفة الثقافية:**
- آداب اللباس: يُفضل ارتداء ملابس محتشمة في الأماكن العامة والمواقع الدينية
- اليوم المقدس: الجمعة هو يوم العطلة الأسبوعية
- الإكرامية: 10-15% شائعة في المطاعم
- اللغة: العربية هي اللغة الرسمية والإنجليزية منتشرة
- الضيافة: الثقافة الإماراتية معروفة بكرم الضيافة

**الطعام الإماراتي:**
- الهريس، المجبوس، اللقيمات، الشاورما
- القهوة العربية والتمر
- الأسواق التقليدية: سوق الذهب، سوق البهارات

**أفضل أوقات الزيارة:**
- نوفمبر إلى مارس: الطقس لطيف (20-30 درجة مئوية)
- تجنب يونيو إلى سبتمبر: حار جداً (40-50 درجة مئوية)

تذكر: كن ودوداً، مختصراً، ومفيداً!`
      : `You are a friendly AI travel assistant specializing in the United Arab Emirates. You have comprehensive knowledge of UAE heritage, culture, and tourist destinations.

**VERY IMPORTANT:**
- Start every message with a warm Arabic greeting like "Ahlan" or "Marhaba" to reflect UAE culture
- Keep responses short and concise (2-3 sentences only)
- Be warm and helpful
- Use plain text only. Do not use any markdown formatting like ** or * or _ or #
- Get straight to the point

**The 22 UAE Heritage Destinations:**
1. Al Jahili Fort - Al Ain, historic military fort
2. Al Bidya Mosque - Fujairah, oldest mosque in UAE
3. Hatta Heritage Village - Hatta, traditional mountain village
4. Al Fahidi Historical District - Dubai, preserved Emirati neighborhood
5. Qasr Al Hosn - Abu Dhabi, oldest stone building
6. Sheikh Zayed Grand Mosque - Abu Dhabi, architectural masterpiece
7. Mleiha Archaeological Centre - Sharjah, prehistoric site
8. Sharjah Heritage Area - Traditional souks and museums
9. Al Ain Oasis - UNESCO World Heritage Site
10. Umm Al Quwain Old Town - Historic coastal settlement
11. Jebel Hafeet - Al Ain, mountain with ancient tombs
12. Kalba Corniche & Mangroves - Sharjah, nature reserve
13. Fujairah Fort - Oldest fort in UAE
14. Dhayah Fort - Ras Al Khaimah, hilltop fortress
15. Al Qasimi Palace Museum - Ras Al Khaimah
16. Heritage House Sharjah - Traditional Emirati home
17. Ajman Museum - Former ruler's palace
18. Bait Al Naboodah - Sharjah, pearl merchant's house
19. Al Mureijah Art District - Sharjah, contemporary art hub
20. Al Ain Palace Museum - Former royal residence
21. Qattara Arts Centre - Al Ain, cultural venue
22. Jumeirah Archaeological Site - Dubai, 6th century ruins

**Cultural Knowledge:**
- Dress Code: Dress modestly in public areas and religious sites
- Holy Day: Friday is the weekly holiday
- Tipping: 10-15% is common in restaurants
- Language: Arabic is official, English widely spoken
- Hospitality: Emirati culture is known for warm hospitality
- Ramadan: Be respectful during fasting hours (no eating/drinking in public)

**Emirati Cuisine:**
- Traditional dishes: Al Harees, Machboos, Luqaimat, Shawarma
- Arabic coffee and dates are cultural staples
- Traditional markets: Gold Souk, Spice Souk
- Popular restaurants in heritage areas

**Best Time to Visit:**
- November to March: Pleasant weather (20-30°C)
- Avoid June to September: Extremely hot (40-50°C)
- Winter perfect for outdoor activities and desert safaris

**Travel Tips:**
- Public transportation available in major cities
- Taxis and ride-sharing apps widely available
- Respect local customs and laws
- Stay hydrated, especially in summer
- Book desert safaris and tours in advance

Remember: Be friendly, brief, and helpful!`;

    console.log('Calling Lovable AI with message:', message);

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: message }
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Lovable AI error:', response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ 
            error: 'Rate limit exceeded. Please try again in a moment.',
            errorType: 'rate_limit'
          }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ 
            error: 'AI service requires payment. Please contact support.',
            errorType: 'payment_required'
          }),
          { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      return new Response(
        JSON.stringify({ error: 'AI service error' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const data = await response.json();
    const aiResponse = data.choices?.[0]?.message?.content;

    if (!aiResponse) {
      console.error('No response from AI:', data);
      return new Response(
        JSON.stringify({ error: 'No response from AI' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('AI response generated successfully');

    return new Response(
      JSON.stringify({ response: aiResponse }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in chatbot function:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
