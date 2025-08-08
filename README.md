# 🛍️ ShopHub - Modern E-commerce Platform

A modern, responsive e-commerce platform built with React, TypeScript, and Tailwind CSS. Features a beautiful UI with smooth animations, real product catalogs, and comprehensive shopping functionality.

![ShopHub Screenshot](https://via.placeholder.com/800x400/0ea5e9/ffffff?text=ShopHub+E-commerce+Platform)

## ✨ Features

### 🛒 **Core E-commerce Functionality**
- **Product Catalog** - Browse products by categories (Mobile, Electronics, Audio, Gaming, etc.)
- **Advanced Filtering** - Filter by category, brand, price range, and sorting options
- **Shopping Cart** - Add/remove items, quantity management, and price calculations
- **Wishlist** - Save favorite products for later
- **Product Search** - Quick search functionality across all products

### 🎨 **Modern UI/UX**
- **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- **Smooth Animations** - Powered by Framer Motion for beautiful interactions
- **Modern Components** - Built with Radix UI and styled with Tailwind CSS
- **Dark/Light Mode** - Theme switching capability
- **Accessibility** - WCAG compliant components

### 📱 **Pages & Sections**
- **Homepage** - Hero section, featured products, categories showcase
- **Shop** - Complete product listing with filters and sorting
- **Categories** - Dedicated category exploration page
- **Deals** - Special offers and flash sales with countdown timers
- **About** - Company information and team details
- **Cart** - Shopping cart management and checkout flow

### 🔐 **Authentication**
- **Google OAuth** - Sign in with Google integration
- **User Management** - Profile and account management
- **Secure Forms** - Form validation with React Hook Form

## 🚀 Tech Stack

### **Frontend Framework**
- **React 18** - Latest React with hooks and modern features
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **React Router 6** - Client-side routing

### **Styling & UI**
- **Tailwind CSS 3** - Utility-first CSS framework
- **Radix UI** - Headless, accessible components
- **Framer Motion** - Animation library
- **Lucide React** - Beautiful icons

### **Development Tools**
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Vitest** - Testing framework
- **TypeScript** - Static type checking

## 📁 Project Structure

```
shophub-ecommerce/
├── src/                          # Source code
│   ├── components/               # Reusable components
│   │   ├── ui/                  # UI component library (Radix + Tailwind)
│   │   ├── AuthDialog.tsx       # Authentication modal
│   │   ├── FloatingParticles.tsx # Animation components
│   │   └── AnimatedBackground.tsx
│   ├── pages/                   # Page components
│   │   ├── Index.tsx           # Homepage
│   │   ├── Shop.tsx            # Product listing
│   │   ├── Categories.tsx      # Category browse
│   │   ├── Deals.tsx           # Special offers
│   │   ├── About.tsx           # About page
│   │   ├── Cart.tsx            # Shopping cart
│   │   └── NotFound.tsx        # 404 page
│   ├── data/                   # Static data
│   │   └── products.ts         # Product catalog
│   ├── hooks/                  # Custom hooks
│   │   ├── use-toast.ts        # Toast notifications
│   │   └── use-mobile.tsx      # Mobile detection
│   ├── lib/                    # Utilities
│   │   └── utils.ts            # Helper functions
│   ├── App.tsx                 # Main app component
│   └── global.css              # Global styles
├── public/                     # Static assets
├── dist/                       # Build output
├── index.html                  # HTML template
├── package.json                # Dependencies
├── tailwind.config.ts          # Tailwind configuration
├── tsconfig.json              # TypeScript configuration
├── vite.config.ts             # Vite configuration
└── README.md                  # Project documentation
```

## 🛠️ Installation & Setup

### Prerequisites
- **Node.js** (v18 or higher)
- **npm** or **yarn**

### 1. Clone the Repository
```bash
git clone <repository-url>
cd shophub-ecommerce
```

### 2. Install Dependencies
```bash
npm install
# or
yarn install
```

### 3. Start Development Server
```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:8080`

## 📜 Available Scripts

### Development
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
```

### Testing & Quality
```bash
npm run test         # Run tests once
npm run test:watch   # Run tests in watch mode
npm run typecheck    # Type check without emitting
npm run lint         # Lint code
npm run format       # Format code with Prettier
```

## 🛍️ Product Catalog

The application features a comprehensive product catalog with real brands:

### **Mobile Phones**
- iPhone 15 Pro Max (Apple)
- Samsung Galaxy S24 Ultra
- Realme GT 7 Pro
- OnePlus 12

### **Electronics**
- MacBook Pro M3 (Apple)
- iPad Pro M2 (Apple)

### **Audio**
- Sony WH-1000XM5 Headphones
- AirPods Pro 2nd Gen (Apple)

### **Gaming**
- Logitech MX Mechanical Keyboard
- Logitech MX Master 3S Mouse

### **Photography**
- Canon RF 85mm f/1.2L USM Lens

### **Wearables**
- Samsung Galaxy Watch6

## 🎨 Design System

### **Color Palette**
- **Primary**: Blue gradient (#0ea5e9 to #0284c7)
- **Secondary**: Slate variations
- **Accent**: Success, Warning, Destructive colors
- **Backgrounds**: White, Slate-50, Gradient backgrounds

### **Typography**
- **Font Family**: Inter (system fallback)
- **Sizes**: Responsive scale from text-xs to text-6xl
- **Weights**: 400 (normal) to 900 (black)

### **Spacing**
- **Consistent Scale**: 0.25rem increments
- **Container**: Max-width with responsive padding
- **Custom Spacing**: 18, 72, 84, 96 units

## 🔧 Configuration

### **Tailwind CSS**
The project uses a custom Tailwind configuration with:
- Extended color palette
- Custom animations (fadeIn, slideUp)
- Product-specific shadows
- Typography plugin integration

### **TypeScript**
Strict TypeScript configuration with:
- Path aliases (`@/` for src directory)
- Strict type checking
- Modern target (ES2020)

### **Vite**
Optimized Vite configuration for:
- Fast HMR (Hot Module Replacement)
- TypeScript support
- Path aliases
- Production optimization

## 📱 Responsive Design

The application is fully responsive with breakpoints:
- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px - 1440px
- **Large Desktop**: 1440px+

## 🚀 Deployment

### **Build for Production**
```bash
npm run build
```

### **Preview Production Build**
```bash
npm run preview
```

### **Deployment Platforms**
The application can be deployed to:
- **Vercel** (Recommended for React apps)
- **Netlify**
- **GitHub Pages**
- **AWS S3 + CloudFront**
- **Firebase Hosting**

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Abhishek Sharma**
- Portfolio: [Your Portfolio URL]
- GitHub: [@abhisheksharma](https://github.com/abhisheksharma)
- LinkedIn: [Your LinkedIn Profile]

## 🙏 Acknowledgments

- **Radix UI** - For accessible component primitives
- **Tailwind CSS** - For the utility-first CSS framework
- **Framer Motion** - For beautiful animations
- **Lucide** - For the icon library
- **Pexels** - For high-quality product images

## 📞 Support

If you have any questions or need help, please:
1. Check the [Issues](issues) section
2. Create a new issue if needed
3. Contact: support@shophub.com

---

⭐ **Star this repository if you found it helpful!**

Built with ❤️ using React, TypeScript, and Tailwind CSS
