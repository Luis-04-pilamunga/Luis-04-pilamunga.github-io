export type Theme = 'light' | 'dark' | 'high-contrast';
export type FontFamily = 'Inter' | 'OpenSans' | 'Roboto';

export interface AppSettings {
  theme: Theme;
  fontFamily: FontFamily;
  fontSize: number;
}

export interface Translation {
  id: string;
  type: 'signs-to-text' | 'text-to-signs' | 'audio-to-signs';
  input: string;
  output: string;
  timestamp: Date;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  price: string;
  features: string[];
  isPopular?: boolean;
}

export interface SignLetter {
  letter: string;
  imageUrl: string;
  description: string;
}