export interface Property {
  id: string;
  titleKg: string;
  titleRu: string;
  titleEn?: string;
  titleKo?: string;
  priceUsd: number;
  districtKg: string;
  districtRu: string;
  districtEn?: string;
  districtKo?: string;
  addressKg: string;
  addressRu: string;
  addressEn?: string;
  addressKo?: string;
  rooms: number;
  m2: number;
  floor: number;
  maxFloor: number;
  seriesKg: string; // e.g. "Элитка", "105-серия", "106-серия"
  seriesRu: string;
  seriesEn?: string;
  seriesKo?: string;
  descriptionKg: string;
  descriptionRu: string;
  descriptionEn?: string;
  descriptionKo?: string;
  image: string;
  type: 'buy' | 'rent';
  isPopular?: boolean;
  addedDate: string;
  agentId: string;
  ownerPhone?: string;
  isCustom?: boolean;
  isBarter?: boolean;
  revealContacts?: boolean;
  lat?: number;
  lng?: number;
}

export interface FilterState {
  search: string;
  district: string;
  minPrice: string;
  maxPrice: string;
  rooms: string; // 'all' | '1' | '2' | '3' | '4+'
  series: string; // 'all' | 'elite' | '104' | '105' | '106' | 'individual'
  type: 'buy' | 'rent';
  isBarterOnly?: boolean;
}

export interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string;
  message: string;
  propertyId?: string;
  date: string;
}

export interface Agent {
  id: string;
  name: string;
  roleKg: string;
  roleRu: string;
  roleEn?: string;
  roleKo?: string;
  phone: string;
  whatsApp: string;
  email: string;
  photo: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  timestamp: string;
}
