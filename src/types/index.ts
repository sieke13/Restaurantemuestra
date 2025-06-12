export interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string; // URL de la imagen
  category: string;
  tags?: string[];
  available?: boolean;
}

export interface Category {
  id: string;
  name: string;
}

export interface Testimonial {
  id: number;
  name: string;
  content: string;
  rating: number;
  date: string;
}

export interface ContactInfo {
  address: string;
  phone: string;
  email: string;
  hours: {
    [key: string]: string;
  };
  socialMedia: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    tiktok?: string;
  };
}
