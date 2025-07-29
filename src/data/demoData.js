// Demo data for the Hedeya e-commerce website

export const categories = [
  {
    id: 1,
    name: 'Flower Arrangements',
    image: 'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    description: 'Fresh, beautiful bouquets for every occasion',
    slug: 'flowers'
  },
  {
    id: 2,
    name: 'Luxury Cakes',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    description: 'Artisan cakes made with premium ingredients',
    slug: 'cakes'
  },
  {
    id: 3,
    name: 'Premium Chocolates',
    image: 'https://images.unsplash.com/photo-1511381939415-e44015466834?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    description: 'Handcrafted chocolates from finest cocoa',
    slug: 'chocolates'
  },
  {
    id: 4,
    name: 'Exquisite Perfumes',
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    description: 'Signature fragrances for sophisticated tastes',
    slug: 'perfumes'
  },
  {
    id: 5,
    name: 'Fine Jewelry',
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    description: 'Elegant pieces for timeless elegance',
    slug: 'jewelry'
  },
  {
    id: 6,
    name: 'Luxury Plants',
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    description: 'Beautiful plants to brighten any space',
    slug: 'plants'
  }
]

export const occasions = [
  {
    id: 1,
    name: 'Birthday',
    image: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    description: 'Make their special day unforgettable',
    color: 'from-pink-400 to-pink-600',
    slug: 'birthday'
  },
  {
    id: 2,
    name: 'Anniversary',
    image: 'https://images.unsplash.com/photo-1520760264565-8afe6a1af5c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    description: 'Celebrate your love story',
    color: 'from-red-400 to-red-600',
    slug: 'anniversary'
  },
  {
    id: 3,
    name: 'Love & Romance',
    image: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    description: 'Express your deepest feelings',
    color: 'from-purple-400 to-purple-600',
    slug: 'romance'
  },
  {
    id: 4,
    name: 'Wedding',
    image: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    description: 'Perfect gifts for the happy couple',
    color: 'from-blue-400 to-blue-600',
    slug: 'wedding'
  },
  {
    id: 5,
    name: 'New Baby',
    image: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    description: 'Welcome the little miracle',
    color: 'from-green-400 to-green-600',
    slug: 'baby'
  },
  {
    id: 6,
    name: 'Graduation',
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    description: 'Celebrate their achievement',
    color: 'from-yellow-400 to-yellow-600',
    slug: 'graduation'
  }
]

export const featuredProducts = [
  {
    id: 1,
    name: 'Elegance Rose Bouquet',
    price: 299,
    originalPrice: 350,
    image: 'https://images.unsplash.com/photo-1520763185298-1b434c919102?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    badge: 'Best Seller',
    rating: 4.9,
    category: 'flowers',
    slug: 'elegance-rose-bouquet'
  },
  {
    id: 2,
    name: 'Luxury Chocolate Box',
    price: 189,
    originalPrice: null,
    image: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    badge: 'New',
    rating: 4.8,
    category: 'chocolates',
    slug: 'luxury-chocolate-box'
  },
  {
    id: 3,
    name: 'Anniversary Gift Set',
    price: 450,
    originalPrice: 520,
    image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    badge: 'Limited',
    rating: 5.0,
    category: 'gift-sets',
    slug: 'anniversary-gift-set'
  },
  {
    id: 4,
    name: 'Premium Perfume Collection',
    price: 380,
    originalPrice: null,
    image: 'https://images.unsplash.com/photo-1588405748880-12d1d2a59d75?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    badge: 'Popular',
    rating: 4.7,
    category: 'perfumes',
    slug: 'premium-perfume-collection'
  },
  {
    id: 5,
    name: 'Birthday Celebration Package',
    price: 325,
    originalPrice: 390,
    image: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    badge: 'Hot',
    rating: 4.9,
    category: 'gift-sets',
    slug: 'birthday-celebration-package'
  },
  {
    id: 6,
    name: 'Executive Business Gift',
    price: 590,
    originalPrice: null,
    image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    badge: 'Premium',
    rating: 4.8,
    category: 'corporate',
    slug: 'executive-business-gift'
  },
  {
    id: 7,
    name: 'Deluxe Cake Collection',
    price: 275,
    originalPrice: 320,
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    badge: 'Featured',
    rating: 4.6,
    category: 'cakes',
    slug: 'deluxe-cake-collection'
  },
  {
    id: 8,
    name: 'Elegant Jewelry Set',
    price: 750,
    originalPrice: 890,
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    badge: 'Luxury',
    rating: 4.9,
    category: 'jewelry',
    slug: 'elegant-jewelry-set'
  }
]

export const testimonials = [
  {
    id: 1,
    name: 'Sarah Al-Mohammed',
    rating: 5,
    comment: 'Absolutely beautiful arrangements! The quality exceeded my expectations.',
    product: 'Elegance Rose Bouquet',
    date: '2025-01-15'
  },
  {
    id: 2,
    name: 'Ahmed Hassan',
    rating: 5,
    comment: 'Perfect for our anniversary. Fast delivery and amazing presentation.',
    product: 'Anniversary Gift Set',
    date: '2025-01-10'
  },
  {
    id: 3,
    name: 'Fatima Al-Rashid',
    rating: 4,
    comment: 'Great corporate gifts for our clients. Very professional service.',
    product: 'Executive Business Gift',
    date: '2025-01-08'
  }
]

export const usps = [
  {
    icon: 'Truck',
    title: 'Same-Day Delivery',
    description: 'Fast and reliable delivery across Riyadh'
  },
  {
    icon: 'Gift',
    title: 'Luxury Gift Wrapping',
    description: 'Beautiful presentation for every gift'
  },
  {
    icon: 'CreditCard',
    title: 'Secure Payments',
    description: 'Safe and encrypted payment processing'
  },
  {
    icon: 'Star',
    title: 'Hand-picked Quality',
    description: 'Carefully curated premium products'
  }
]
