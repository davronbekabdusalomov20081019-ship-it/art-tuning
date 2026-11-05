export type ServiceCategory = 'reupholstery' | 'repair' | 'comfort' | 'detailing';

export interface ServiceItem {
  id: string;
  category: ServiceCategory;
  title: string;
  subtitle: string;
  shortDesc: string;
  fullDesc: string;
  priceFrom: number | null; // null if by request
  priceDisplay: string;
  duration: string;
  warranty: string;
  image: string;
  tags: string[];
  features: string[];
  stages: string[];
  suitableMaterials?: string[];
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: 'all' | 'interior' | 'steering' | 'repair' | 'alcantara';
  categoryLabel: string;
  car: string;
  description: string;
  image: string;
  beforeImage?: string;
  afterImage?: string;
  isBeforeAfter?: boolean;
  specs: {
    duration: string;
    materials: string;
    works: string;
  };
}

export interface MaterialColor {
  name: string;
  hex: string;
  code: string;
}

export interface MaterialItem {
  id: string;
  name: string;
  type: string;
  origin: string;
  subtitle: string;
  description: string;
  image: string;
  specs: {
    wearResistance: string;
    thickness: string;
    breathability: string;
    warranty: string;
  };
  features: string[];
  colors: MaterialColor[];
}

export interface ReviewItem {
  id: string;
  author: string;
  car: string;
  service: string;
  rating: number;
  date: string;
  text: string;
  source: 'Yandex' | '2GIS' | 'Flamp';
  avatarInitials: string;
  verified: boolean;
}

export interface ConfiguratorOption {
  id: string;
  name: string;
  category: string;
  basePrice: number;
  duration: string;
  popular?: boolean;
  description?: string;
}

export interface ConfiguratorState {
  carClass: string;
  carMake: string;
  carModel: string;
  carYear: string;
  selectedServices: string[];
  materialId: string;
  colorName: string;
  stitchPattern: 'classic' | 'diamond' | 'stripes' | 'honeycomb';
  stitchColor: string;
  perforation: 'none' | 'center' | 'sport';
  extraOptions: string[];
  name: string;
  phone: string;
  comment: string;
  photoFiles: File[];
}
