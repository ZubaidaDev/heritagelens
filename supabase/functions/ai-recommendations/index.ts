import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface UserHistory {
  reviews: Array<{ destination: string; rating: number; comment: string }>;
  journals: Array<{ location: string; title: string; content: string }>;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { userId, currentDestination, allDestinations } = await req.json();

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Fetch user's travel history
    const [reviewsRes, journalsRes] = await Promise.all([
      supabase
        .from('reviews')
        .select('destination, rating, comment')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(10),
      supabase
        .from('journals')
        .select('location, title, content')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(10)
    ]);

    const userHistory: UserHistory = {
      reviews: reviewsRes.data || [],
      journals: journalsRes.data || []
    };

    // If no history, return empty recommendations
    if (userHistory.reviews.length === 0 && userHistory.journals.length === 0) {
      return new Response(
        JSON.stringify({ recommendations: [] }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Build context from user history
    const reviewedPlaces = userHistory.reviews
      .map(r => `${r.destination} (rated ${r.rating}/5): ${r.comment}`)
      .join('\n');
    
    const journaledPlaces = userHistory.journals
      .map(j => `${j.location} - ${j.title}: ${j.content.slice(0, 200)}`)
      .join('\n');

    const prompt = `You are a UAE heritage travel expert. Based on the user's travel history, recommend 3 UAE heritage destinations they would enjoy.

User's Travel History:
REVIEWED PLACES:
${reviewedPlaces}

JOURNAL ENTRIES:
${journaledPlaces}

CURRENT DESTINATION VIEWING:
${currentDestination}

AVAILABLE DESTINATIONS TO RECOMMEND FROM:
${allDestinations.join(', ')}

IMPORTANT: Only recommend from the available destinations list. Do not recommend the current destination.

Analyze the user's preferences based on:
- Types of heritage sites they've enjoyed (forts, mosques, museums, archaeological sites)
- Architectural styles they appreciate
- Cultural interests shown in their journals
- Rating patterns in their reviews

Provide 3 recommendations in this exact JSON format:
{
  "recommendations": [
    {
      "destination": "Destination Name",
      "reason": "Brief personalized reason why this matches their interests (max 100 chars)",
      "confidence": 0.95
    }
  ]
}`;

    const lovableApiKey = Deno.env.get('LOVABLE_API_KEY');
    if (!lovableApiKey) {
      throw new Error('LOVABLE_API_KEY not configured');
    }

    const aiResponse = await fetch('https://api.lovable.app/v1/ai/text', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${lovableApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        prompt: prompt,
      }),
    });

    if (!aiResponse.ok) {
      throw new Error(`AI API error: ${aiResponse.statusText}`);
    }

    const aiData = await aiResponse.json();
    const aiText = aiData.text || aiData.choices?.[0]?.message?.content || '';
    
    // Extract JSON from response
    let recommendations = [];
    try {
      const jsonMatch = aiText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        recommendations = parsed.recommendations || [];
      }
    } catch (e) {
      console.error('Error parsing AI response:', e);
    }

    // Filter out current destination and ensure valid recommendations
    recommendations = recommendations
      .filter((rec: any) => rec.destination !== currentDestination)
      .slice(0, 3);

    return new Response(
      JSON.stringify({ recommendations }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in ai-recommendations:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        recommendations: []
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500
      }
    );
  }
});
