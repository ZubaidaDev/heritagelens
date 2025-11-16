// Shared list of destination names for autocomplete and validation
export const DESTINATION_NAMES = [
  'Al Jahili Fort',
  'Al Bidya Mosque',
  'Hatta Heritage Village',
  'Al Fahidi Historical District',
  'Qasr Al Hosn',
  'Sheikh Zayed Grand Mosque',
  'Mleiha Archaeological Centre',
  'Sharjah Heritage Area',
  'Al Ain Oasis',
  'Umm Al Quwain Old Town',
  'Jebel Hafeet',
  'Kalba Corniche & Mangroves'
] as const;

export type DestinationName = typeof DESTINATION_NAMES[number];
