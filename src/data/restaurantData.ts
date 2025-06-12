import type { MenuItem, Category, Testimonial, ContactInfo } from '../types';
import images from '../assets';

export const categories: Category[] = [
  { id: 'starters', name: 'Entrantes' },
  { id: 'main', name: 'Platos Principales' },
  { id: 'desserts', name: 'Postres' },
  { id: 'drinks', name: 'Bebidas' }
];

export const menuItems: MenuItem[] = [  {    id: 1,
    name: 'Ensalada César',
    description: 'Lechuga romana, pollo a la parrilla, crutones, queso parmesano y nuestra salsa césar casera',
    price: 85,
    imageUrl: images.caesarSalad,
    category: 'starters',
    tags: ['saludable', 'popular']
  },  {
    id: 2,
    name: 'Guacamole Fresco',
    description: 'Guacamole fresco preparado al momento con aguacate, tomate, cebolla y chile',
    price: 65,
    imageUrl: images.croquetas,
    category: 'starters'
  },  {
    id: 3,
    name: 'Mole Poblano',
    description: 'Auténtico mole poblano con pollo, servido con arroz y tortillas de maíz',
    price: 120,
    imageUrl: images.paella,
    category: 'main',
    tags: ['tradicional', 'popular']
  },  {
    id: 4,
    name: 'Chiles Rellenos',
    description: 'Chiles poblanos rellenos de queso, bañados en salsa de tomate casera',
    price: 110,
    imageUrl: images.entrecot,
    category: 'main'
  },  {
    id: 5,
    name: 'Flan Casero',
    description: 'Flan casero con caramelo y un toque de canela',
    price: 45,
    imageUrl: images.flan,
    category: 'desserts'
  },  {
    id: 6,
    name: 'Tarta de Chocolate',
    description: 'Tarta de chocolate con salsa de frambuesa',
    price: 55,
    imageUrl: images.chocolateCake,
    category: 'desserts',
    tags: ['popular']
  },  {    id: 7,
    name: 'Margarita',
    description: 'Margarita clásica con tequila, limón y un borde de sal',
    price: 75,
    imageUrl: images.sangria,
    category: 'drinks',
    tags: ['alcohol']
  },{
    id: 8,
    name: 'Agua Mineral',
    description: 'Agua mineral natural',
    price: 25,
    imageUrl: images.water,
    category: 'drinks'
  }
];

export const testimonials: Testimonial[] = [  {
    id: 1,
    name: 'María García',
    content: '¡El mole poblano es auténtico y delicioso! Sin duda volveré a visitarles.',
    rating: 5,
    date: '2025-05-15'
  },
  {
    id: 2,
    name: 'Juan Martínez',
    content: 'Excelente servicio y comida de gran calidad. Ambiente muy agradable.',
    rating: 4,
    date: '2025-05-02'
  },  {
    id: 3,
    name: 'Ana Rodríguez',
    content: 'Probé el guacamole y estaba increíble. El personal muy amable.',
    rating: 5,
    date: '2025-04-20'
  }
];

export const contactInfo: ContactInfo = {
  address: 'Calle Principal 123, Iramuco, Guanajuato, México',
  phone: '+52 461 123 4567',
  email: 'info@restaurantemuestra.com',
  hours: {
    'Lunes': '12:00 - 22:00',
    'Martes': '12:00 - 22:00',
    'Miércoles': '12:00 - 22:00',
    'Jueves': '12:00 - 22:00',
    'Viernes': '12:00 - 23:30',
    'Sábado': '12:00 - 23:30',
    'Domingo': '12:00 - 22:00'
  },
  socialMedia: {
    facebook: 'https://facebook.com/restaurantemuestra',
    instagram: 'https://instagram.com/restaurantemuestra',
    twitter: 'https://twitter.com/restaurantemuestra'
  }
};
