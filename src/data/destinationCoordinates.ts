// Google Maps coordinates for UAE heritage destinations
export const DESTINATION_COORDINATES: Record<string, { lat: number; lng: number; placeId?: string }> = {
  'Al Jahili Fort': { lat: 24.2184, lng: 55.7561, placeId: 'ChIJhc7YBK9wXj4Roa8wjf0oLTM' },
  'Al Bidya Mosque': { lat: 25.3412, lng: 56.3425, placeId: 'ChIJ5Qz7b_p7Xj4RfUg3EGJoMPE' },
  'Hatta Heritage Village': { lat: 24.8074, lng: 56.1265, placeId: 'ChIJEQr0sGx9Xz4Rj_LjQqMKJdQ' },
  'Al Fahidi Historical District': { lat: 25.2635, lng: 55.2972, placeId: 'ChIJ_7Zx2E5xXz4RaqHWv5qKMh4' },
  'Qasr Al Hosn': { lat: 24.4824, lng: 54.3548, placeId: 'ChIJN3f3C4NcXz4R3KJmIhB5vDs' },
  'Sheikh Zayed Grand Mosque': { lat: 24.4128, lng: 54.4750, placeId: 'ChIJW--9JqJiXz4Rn3bJZb0xHfM' },
  'Mleiha Archaeological Centre': { lat: 25.1426, lng: 55.8431, placeId: 'ChIJR9vJr9tkXz4R5YKqZBIjKnI' },
  'Sharjah Heritage Area': { lat: 25.3612, lng: 55.3907, placeId: 'ChIJkZhDbW58Xz4R3VWJTcfKpzs' },
  'Al Ain Oasis': { lat: 24.2110, lng: 55.7644, placeId: 'ChIJQT7rmKRwXj4RjV6A1_wM-AY' },
  'Umm Al Quwain Old Town': { lat: 25.5647, lng: 55.5521, placeId: 'ChIJb_yFjGJ-Xz4RsVWJTcfKpzs' },
  'Jebel Hafeet': { lat: 24.0654, lng: 55.7875, placeId: 'ChIJ6-hH-NRuXj4R-FXgTp5g1Hk' },
  'Kalba Corniche & Mangroves': { lat: 25.0711, lng: 56.3517, placeId: 'ChIJU5YxqXZ6Xj4RpFWJTcfKpzs' },
  'Fujairah Fort': { lat: 25.1214, lng: 56.3413, placeId: 'ChIJt_f3C4NcXz4RpFWJTcfKpzs' },
  'Dhayah Fort': { lat: 25.9681, lng: 56.0535, placeId: 'ChIJVdwjPsF8Xz4RqFWJTcfKpzs' },
  'Al Qasimi Palace Museum': { lat: 25.3576, lng: 55.3915, placeId: 'ChIJ1_f3C4NcXz4RrFWJTcfKpzs' },
  'Heritage House Sharjah': { lat: 25.3627, lng: 55.3914, placeId: 'ChIJ2_f3C4NcXz4RsFWJTcfKpzs' },
  'Ajman Museum': { lat: 25.4051, lng: 55.4387, placeId: 'ChIJ3_f3C4NcXz4RtFWJTcfKpzs' },
  'Bait Al Naboodah': { lat: 25.3619, lng: 55.3922, placeId: 'ChIJ4_f3C4NcXz4RuFWJTcfKpzs' },
  'Al Mureijah Art District': { lat: 25.3594, lng: 55.3893, placeId: 'ChIJ5_f3C4NcXz4RvFWJTcfKpzs' },
  'Al Ain Palace Museum': { lat: 24.2079, lng: 55.7583, placeId: 'ChIJ6_f3C4NcXz4RwFWJTcfKpzs' },
  'Qattara Arts Centre': { lat: 24.2143, lng: 55.7634, placeId: 'ChIJ7_f3C4NcXz4RxFWJTcfKpzs' },
  'Jumeirah Archaeological Site': { lat: 25.2312, lng: 55.2573, placeId: 'ChIJ8_f3C4NcXz4RyFWJTcfKpzs' },
  'Sheikh Zayed Festival': { lat: 24.2547, lng: 54.6091 },
  'Qasr Al Hosn Gardens': { lat: 24.4815, lng: 54.3542 },
  'Heritage Village Abu Dhabi': { lat: 24.4764, lng: 54.3195 },
  'Al Shindagha Museum': { lat: 25.2697, lng: 55.2867 },
};

export const getGoogleMapsUrl = (destinationName: string): string => {
  const coords = DESTINATION_COORDINATES[destinationName];
  
  if (coords) {
    return `https://www.google.com/maps/dir/?api=1&destination=${coords.lat},${coords.lng}`;
  }
  
  // Fallback to text search if coordinates not found
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(destinationName + ' UAE')}`;
};
