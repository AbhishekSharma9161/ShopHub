export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  category: string;
  brand: string;
  isNew: boolean;
  discount: number;
  description: string;
  features: string[];
  inStock: number;
  colors?: string[];
  sizes?: string[];
}

export const featuredProducts: Product[] = [
  {
    id: 1,
    name: "iPhone 15 Pro Max",
    price: 1199.99,
    originalPrice: 1399.99,
    rating: 4.9,
    reviews: 1247,
    image: "https://images.pexels.com/photos/3934704/pexels-photo-3934704.jpeg",
    category: "Mobile",
    brand: "Apple",
    isNew: true,
    discount: 14,
    description: "The most advanced iPhone with titanium design, A17 Pro chip, and professional camera system.",
    features: ["A17 Pro Chip", "Titanium Design", "Pro Camera System", "Action Button"],
    inStock: 45,
    colors: ["Natural Titanium", "Blue Titanium", "White Titanium", "Black Titanium"]
  },
  {
    id: 2,
    name: "Samsung Galaxy Watch6",
    price: 329.99,
    originalPrice: 399.99,
    rating: 4.7,
    reviews: 892,
    image: "https://images.pexels.com/photos/13566767/pexels-photo-13566767.jpeg",
    category: "Wearables",
    brand: "Samsung",
    isNew: false,
    discount: 18,
    description: "Advanced smartwatch with health monitoring, GPS tracking, and long-lasting battery.",
    features: ["Health Monitoring", "GPS Tracking", "Long Battery Life", "Water Resistant"],
    inStock: 67,
    colors: ["Graphite", "Silver", "Gold"],
    sizes: ["40mm", "44mm"]
  },
  {
    id: 3,
    name: "Sony WH-1000XM5 Headphones",
    price: 399.99,
    originalPrice: 499.99,
    rating: 4.8,
    reviews: 2341,
    image: "https://images.pexels.com/photos/3568518/pexels-photo-3568518.jpeg",
    category: "Audio",
    brand: "Sony",
    isNew: true,
    discount: 20,
    description: "Industry-leading noise canceling with exceptional sound quality and 30-hour battery life.",
    features: ["Active Noise Cancellation", "30-hour Battery", "Quick Charge", "Premium Drivers"],
    inStock: 23,
    colors: ["Black", "Silver"]
  },
  {
    id: 4,
    name: "Canon RF 85mm f/1.2L USM",
    price: 2699.99,
    originalPrice: 2999.99,
    rating: 4.9,
    reviews: 234,
    image: "https://images.pexels.com/photos/13284606/pexels-photo-13284606.jpeg",
    category: "Photography",
    brand: "Canon",
    isNew: false,
    discount: 10,
    description: "Professional-grade portrait lens with exceptional bokeh and ultra-fast autofocus.",
    features: ["85mm Focal Length", "f/1.2 Aperture", "Weather Sealed", "Ultra-fast AF"],
    inStock: 34,
    colors: ["Black"]
  },
  {
    id: 5,
    name: "Logitech MX Mechanical",
    price: 169.99,
    originalPrice: 199.99,
    rating: 4.6,
    reviews: 567,
    image: "https://images.pexels.com/photos/5380584/pexels-photo-5380584.jpeg",
    category: "Gaming",
    brand: "Logitech",
    isNew: true,
    discount: 15,
    description: "Premium mechanical keyboard with tactile switches and customizable backlighting.",
    features: ["Mechanical Switches", "RGB Backlighting", "Programmable Keys", "Wireless"],
    inStock: 78,
    colors: ["Graphite", "Pale Gray"]
  },
  {
    id: 6,
    name: "Logitech MX Master 3S",
    price: 99.99,
    originalPrice: 129.99,
    rating: 4.7,
    reviews: 1203,
    image: "https://images.pexels.com/photos/11591941/pexels-photo-11591941.jpeg",
    category: "Gaming",
    brand: "Logitech",
    isNew: false,
    discount: 23,
    description: "Advanced wireless mouse with precision tracking and customizable buttons.",
    features: ["4000 DPI", "Wireless", "Programmable Buttons", "90-day Battery"],
    inStock: 91,
    colors: ["Graphite", "Pale Gray", "Rose"]
  },
  {
    id: 7,
    name: "MacBook Pro 16-inch M3",
    price: 2499.99,
    originalPrice: 2799.99,
    rating: 4.9,
    reviews: 456,
    image: "https://images.pexels.com/photos/16738220/pexels-photo-16738220.jpeg",
    category: "Electronics",
    brand: "Apple",
    isNew: true,
    discount: 11,
    description: "Most powerful MacBook Pro with M3 Pro chip, stunning Liquid Retina XDR display.",
    features: ["M3 Pro Chip", "16-inch Display", "18GB Unified Memory", "512GB SSD"],
    inStock: 42,
    colors: ["Space Gray", "Silver"]
  },
  {
    id: 8,
    name: "Samsung Galaxy S24 Ultra",
    price: 1299.99,
    originalPrice: 1499.99,
    rating: 4.8,
    reviews: 987,
    image: "https://images.pexels.com/photos/3934704/pexels-photo-3934704.jpeg",
    category: "Mobile",
    brand: "Samsung",
    isNew: true,
    discount: 13,
    description: "Ultimate Android flagship with S Pen, advanced cameras, and AI features.",
    features: ["S Pen Included", "200MP Camera", "AI Features", "5000mAh Battery"],
    inStock: 156,
    colors: ["Titanium Gray", "Titanium Black", "Titanium Violet", "Titanium Yellow"]
  },
  {
    id: 9,
    name: "Realme GT 7 Pro",
    price: 649.99,
    originalPrice: 799.99,
    rating: 4.5,
    reviews: 678,
    image: "https://images.pexels.com/photos/3934704/pexels-photo-3934704.jpeg",
    category: "Mobile",
    brand: "Realme",
    isNew: true,
    discount: 19,
    description: "Flagship performance at an affordable price with Snapdragon 8 Gen 3 and 120Hz display.",
    features: ["Snapdragon 8 Gen 3", "120Hz Display", "50MP Camera", "5400mAh Battery"],
    inStock: 234,
    colors: ["Mars Orange", "Galaxy Silver"]
  },
  {
    id: 10,
    name: "OnePlus 12",
    price: 799.99,
    originalPrice: 899.99,
    rating: 4.6,
    reviews: 423,
    image: "https://images.pexels.com/photos/3934704/pexels-photo-3934704.jpeg",
    category: "Mobile",
    brand: "OnePlus",
    isNew: false,
    discount: 11,
    description: "Never Settle with flagship performance, Hasselblad cameras, and ultra-fast charging.",
    features: ["Snapdragon 8 Gen 3", "Hasselblad Camera", "100W Charging", "120Hz Display"],
    inStock: 167,
    colors: ["Silky Black", "Flowy Emerald"]
  }
];

export const allProducts: Product[] = [
  ...featuredProducts,
  {
    id: 11,
    name: "iPad Pro 12.9-inch M2",
    price: 1099.99,
    originalPrice: 1299.99,
    rating: 4.8,
    reviews: 567,
    image: "https://images.pexels.com/photos/16738220/pexels-photo-16738220.jpeg",
    category: "Electronics",
    brand: "Apple",
    isNew: false,
    discount: 15,
    description: "The ultimate iPad experience with M2 chip and Liquid Retina XDR display.",
    features: ["M2 Chip", "12.9-inch Display", "Apple Pencil Support", "5G Connectivity"],
    inStock: 89,
    colors: ["Space Gray", "Silver"]
  },
  {
    id: 12,
    name: "AirPods Pro 2nd Gen",
    price: 249.99,
    originalPrice: 279.99,
    rating: 4.7,
    reviews: 1890,
    image: "https://images.pexels.com/photos/3568518/pexels-photo-3568518.jpeg",
    category: "Audio",
    brand: "Apple",
    isNew: true,
    discount: 11,
    description: "Next-level noise cancellation and immersive sound with spatial audio.",
    features: ["Active Noise Cancellation", "Spatial Audio", "6-hour Battery", "MagSafe Charging"],
    inStock: 234,
    colors: ["White"]
  }
];

export const categories = [
  { 
    name: "Mobile", 
    count: 4, 
    icon: "📱", 
    image: "https://images.pexels.com/photos/3934704/pexels-photo-3934704.jpeg",
    description: "Latest smartphones from top brands"
  },
  { 
    name: "Electronics", 
    count: 3, 
    icon: "💻", 
    image: "https://images.pexels.com/photos/16738220/pexels-photo-16738220.jpeg",
    description: "Laptops, tablets and computing devices"
  },
  { 
    name: "Audio", 
    count: 2, 
    icon: "🎧", 
    image: "https://images.pexels.com/photos/3568518/pexels-photo-3568518.jpeg",
    description: "Headphones, earbuds and speakers"
  },
  { 
    name: "Gaming", 
    count: 2, 
    icon: "🎮", 
    image: "https://images.pexels.com/photos/5380584/pexels-photo-5380584.jpeg",
    description: "Gaming accessories and peripherals"
  },
  { 
    name: "Wearables", 
    count: 1, 
    icon: "⌚", 
    image: "https://images.pexels.com/photos/13566767/pexels-photo-13566767.jpeg",
    description: "Smartwatches and fitness trackers"
  },
  { 
    name: "Photography", 
    count: 1, 
    icon: "📸", 
    image: "https://images.pexels.com/photos/13284606/pexels-photo-13284606.jpeg",
    description: "Cameras, lenses and photography gear"
  }
];

export const brands = [
  "All", "Apple", "Samsung", "Sony", "Canon", "Logitech", "Realme", "OnePlus"
];
