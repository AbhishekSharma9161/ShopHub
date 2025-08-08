import { useState, useEffect } from "react";
import { ShoppingCart, Heart, Star, Search, Menu, User, ArrowRight, Play, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { featuredProducts, categories } from "@/data/products";
import AuthDialog from "@/components/AuthDialog";
import FloatingParticles from "@/components/FloatingParticles";
import AnimatedBackground from "@/components/AnimatedBackground";

export default function Index() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState(0);
  const [wishlistItems, setWishlistItems] = useState<number[]>([]);
  const [currentHeroImage, setCurrentHeroImage] = useState(0);

  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, -50]);
  const y2 = useTransform(scrollY, [0, 300], [0, -100]);

  const heroRef = useRef(null);
  const categoriesRef = useRef(null);
  const productsRef = useRef(null);
  const newsletterRef = useRef(null);

  const isHeroInView = useInView(heroRef, { once: true });
  const isCategoriesInView = useInView(categoriesRef, { once: true });
  const isProductsInView = useInView(productsRef, { once: true });
  const isNewsletterInView = useInView(newsletterRef, { once: true });

  const heroImages = [
    "https://images.pexels.com/photos/3568518/pexels-photo-3568518.jpeg",
    "https://images.pexels.com/photos/179908/pexels-photo-179908.jpeg",
    "https://images.pexels.com/photos/671629/pexels-photo-671629.jpeg"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroImage((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const addToCart = (productId: number) => {
    setCartItems(prev => prev + 1);
  };

  const toggleWishlist = (productId: number) => {
    setWishlistItems(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <motion.header 
        className="border-b sticky top-0 bg-white/80 backdrop-blur-md z-50"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="container mx-auto px-4">
          {/* Top bar */}
          <motion.div 
            className="flex items-center justify-between py-2 text-sm text-muted-foreground border-b"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <span className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-yellow-500" />
              Free shipping on orders over $99
            </span>
            <div className="flex items-center gap-4">
              <span
                className="hidden sm:inline hover:text-primary cursor-pointer transition-colors"
                onClick={() => alert('Track Order functionality would be implemented here')}
              >
                Track Order
              </span>
              <span
                className="hidden sm:inline hover:text-primary cursor-pointer transition-colors"
                onClick={() => alert('Help & Support - Contact us at support@shophub.com')}
              >
                Help
              </span>
              <span className="hover:text-primary cursor-pointer transition-colors">EN</span>
            </div>
          </motion.div>
          
          {/* Main header */}
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-8">
              <motion.h1 
                className="text-2xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <a href="/">ShopHub</a>
              </motion.h1>
              <nav className="hidden md:flex items-center gap-6">
                <motion.a href="/" className="text-foreground hover:text-primary transition-colors" whileHover={{ y: -2 }}>Home</motion.a>
                <motion.a href="/shop" className="text-muted-foreground hover:text-primary transition-colors" whileHover={{ y: -2 }}>Shop</motion.a>
                <motion.a href="/categories" className="text-muted-foreground hover:text-primary transition-colors" whileHover={{ y: -2 }}>Categories</motion.a>
                <motion.a href="/deals" className="text-muted-foreground hover:text-primary transition-colors" whileHover={{ y: -2 }}>Deals</motion.a>
                <motion.a href="/about" className="text-muted-foreground hover:text-primary transition-colors" whileHover={{ y: -2 }}>About</motion.a>
              </nav>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-2">
                <motion.div 
                  className="relative"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input 
                    placeholder="Search products..." 
                    className="pl-10 w-64 focus:ring-2 focus:ring-primary/20"
                  />
                </motion.div>
              </div>
              
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                <AuthDialog>
                  <Button variant="ghost" size="sm">
                    <User className="h-5 w-5" />
                  </Button>
                </AuthDialog>
              </motion.div>
              
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                <Button variant="ghost" size="sm" className="relative">
                  <Heart className="h-5 w-5" />
                  {wishlistItems.length > 0 && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 500 }}
                    >
                      <Badge variant="destructive" className="absolute -top-2 -right-2 h-5 w-5 p-0 text-xs">
                        {wishlistItems.length}
                      </Badge>
                    </motion.div>
                  )}
                </Button>
              </motion.div>
              
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                <Button variant="ghost" size="sm" className="relative" asChild>
                  <a href="/cart">
                    <ShoppingCart className="h-5 w-5" />
                    {cartItems > 0 && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 500 }}
                      >
                        <Badge variant="destructive" className="absolute -top-2 -right-2 h-5 w-5 p-0 text-xs">
                          {cartItems}
                        </Badge>
                      </motion.div>
                    )}
                  </a>
                </Button>
              </motion.div>
              
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                <Button variant="ghost" size="sm" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <motion.section
        ref={heroRef}
        className="relative bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 overflow-hidden"
        style={{ y: y1 }}
      >
        <AnimatedBackground />
        <FloatingParticles count={15} />
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container mx-auto px-4 py-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isHeroInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                <Badge variant="secondary" className="mb-4 animate-pulse">
                  <Sparkles className="h-3 w-3 mr-1" />
                  New Collection 2024
                </Badge>
              </motion.div>
              
              <motion.h2 
                className="text-5xl font-bold text-foreground mb-6 leading-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                Discover Amazing 
                <motion.span 
                  className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent"
                  animate={{ 
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                > Products</motion.span>
              </motion.h2>
              
              <motion.p 
                className="text-xl text-muted-foreground mb-8 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                Shop the latest trends and exclusive deals. From electronics to fashion, 
                find everything you need with fast shipping and great prices.
              </motion.p>
              
              <motion.div 
                className="flex gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.8, duration: 0.6 }}
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <Button
                    size="lg"
                    className="px-8 bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90"
                    onClick={() => {
                      console.log('Shop Now button clicked');
                      navigate('/shop');
                    }}
                  >
                    Shop Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <Button
                    variant="outline"
                    size="lg"
                    className="px-8 group"
                    onClick={() => {
                      console.log('View Deals button clicked');
                      navigate('/deals');
                    }}
                  >
                    <Play className="mr-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    View Deals
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>
            
            <motion.div 
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              animate={isHeroInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              <motion.div 
                className="bg-gradient-to-br from-primary/10 to-blue-600/10 rounded-3xl p-8 transform rotate-3 relative overflow-hidden"
                whileHover={{ rotate: 1, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-full"
                  animate={{ translateX: ["-100%", "200%"] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                />
                <motion.img 
                  src={heroImages[currentHeroImage]}
                  alt="Featured Product" 
                  className="w-full h-64 object-cover rounded-2xl transform -rotate-3"
                  key={currentHeroImage}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5 }}
                />
              </motion.div>
              <motion.div 
                className="absolute top-4 right-4 bg-destructive text-destructive-foreground px-3 py-1 rounded-full text-sm font-semibold"
                animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                -30% OFF
              </motion.div>
              
              {/* Floating elements */}
              <motion.div
                className="absolute -top-4 -left-4 w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full opacity-20"
                animate={{ y: [0, -20, 0], rotate: [0, 180, 360] }}
                transition={{ duration: 6, repeat: Infinity }}
              />
              <motion.div
                className="absolute -bottom-6 -right-6 w-20 h-20 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full opacity-20"
                animate={{ y: [0, 20, 0], rotate: [0, -180, -360] }}
                transition={{ duration: 8, repeat: Infinity }}
              />
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Categories */}
      <motion.section 
        ref={categoriesRef}
        className="py-16 bg-white"
        style={{ y: y2 }}
      >
        <div className="container mx-auto px-4">
          <motion.h3 
            className="text-3xl font-bold text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={isCategoriesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            Shop by Category
          </motion.h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.filter(cat => cat.name !== "All").map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={isCategoriesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{
                  y: -10,
                  scale: 1.05,
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)"
                }}
                className="group cursor-pointer"
                onClick={() => {
                  console.log(`Category ${category.name} clicked`);
                  navigate(`/shop?category=${category.name}`);
                }}
              >
                <Card className="overflow-hidden bg-gradient-to-br from-white to-slate-50 border-2 border-transparent hover:border-primary/20 transition-all duration-300">
                  <CardContent className="p-6 text-center relative">
                    <motion.div
                      className="text-4xl mb-4"
                      whileHover={{ scale: 1.2, rotate: 10 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      {category.icon}
                    </motion.div>
                    <h4 className="font-semibold mb-2 group-hover:text-primary transition-colors">{category.name}</h4>
                    <p className="text-sm text-muted-foreground">{category.count} items</p>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-primary/5 to-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      initial={false}
                    />
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Featured Products */}
      <motion.section 
        ref={productsRef}
        className="py-16 bg-slate-50"
      >
        <div className="container mx-auto px-4">
          <motion.div 
            className="flex items-center justify-between mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={isProductsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-3xl font-bold">Featured Products</h3>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="outline"
                onClick={() => {
                  console.log('View All Products button clicked');
                  navigate('/shop');
                }}
              >
                View All Products
              </Button>
            </motion.div>
          </motion.div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.slice(0, 4).map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 50 }}
                animate={isProductsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ y: -5 }}
                className="group"
              >
                <Card
                  className="cursor-pointer overflow-hidden bg-white border-2 border-transparent hover:border-primary/20 hover:shadow-2xl transition-all duration-300"
                  onClick={() => {
                    console.log(`Product ${product.name} clicked`);
                    navigate(`/shop?category=${product.category}`);
                  }}
                >
                  <div className="relative overflow-hidden">
                    <motion.img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-48 object-cover"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                    />
                    <div className="absolute top-3 left-3 flex gap-2">
                      {product.isNew && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.2 + index * 0.1 }}
                        >
                          <Badge variant="secondary" className="bg-green-100 text-green-800">New</Badge>
                        </motion.div>
                      )}
                      {product.discount > 0 && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.3 + index * 0.1 }}
                        >
                          <Badge variant="destructive">-{product.discount}%</Badge>
                        </motion.div>
                      )}
                    </div>
                    <motion.div
                      className="absolute top-3 right-3"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Button
                        variant="ghost"
                        size="sm"
                        className="bg-white/80 hover:bg-white backdrop-blur-sm"
                        onClick={() => toggleWishlist(product.id)}
                      >
                        <Heart 
                          className={`h-4 w-4 transition-colors ${wishlistItems.includes(product.id) ? 'fill-red-500 text-red-500' : ''}`} 
                        />
                      </Button>
                    </motion.div>
                    
                    {/* Hover overlay */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      initial={false}
                    />
                  </div>
                  
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.4 + i * 0.05 + index * 0.1 }}
                          >
                            <Star 
                              className={`h-3 w-3 ${i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                            />
                          </motion.div>
                        ))}
                      </div>
                      <span className="text-xs text-muted-foreground">({product.reviews})</span>
                    </div>
                    
                    <h4 className="font-semibold mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                      {product.name}
                    </h4>
                    
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-lg font-bold">${product.price}</span>
                      {product.originalPrice && product.originalPrice > product.price && (
                        <span className="text-sm text-muted-foreground line-through">
                          ${product.originalPrice}
                        </span>
                      )}
                    </div>
                    
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button 
                        className="w-full bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90" 
                        size="sm"
                        onClick={() => addToCart(product.id)}
                      >
                        Add to Cart
                      </Button>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Newsletter */}
      <motion.section 
        ref={newsletterRef}
        className="py-16 bg-gradient-to-r from-primary to-blue-600 text-primary-foreground relative overflow-hidden"
      >
        <motion.div
          className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-20"
          animate={{ x: [0, 40, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.h3 
            className="text-3xl font-bold mb-4"
            initial={{ opacity: 0, y: 30 }}
            animate={isNewsletterInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            Stay Updated
          </motion.h3>
          <motion.p 
            className="text-xl mb-8 opacity-90"
            initial={{ opacity: 0, y: 20 }}
            animate={isNewsletterInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Get the latest deals and new arrivals delivered to your inbox
          </motion.p>
          <motion.div
            className="flex max-w-md mx-auto gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isNewsletterInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <motion.div
              className="flex-1"
              whileFocus={{ scale: 1.02 }}
            >
              <Input
                id="newsletter-email"
                type="email"
                placeholder="Enter your email"
                className="bg-white text-foreground border-white focus:ring-2 focus:ring-white/20"
              />
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="secondary"
                className="bg-white text-primary hover:bg-white/90"
                onClick={() => {
                  const email = (document.getElementById('newsletter-email') as HTMLInputElement)?.value;
                  if (email && email.includes('@')) {
                    alert(`Thank you for subscribing with ${email}! You'll receive our latest deals and updates.`);
                    (document.getElementById('newsletter-email') as HTMLInputElement).value = '';
                  } else {
                    alert('Please enter a valid email address.');
                  }
                }}
              >
                Subscribe
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h4 className="text-white font-bold text-xl mb-4 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">ShopHub</h4>
              <p className="mb-4">Your one-stop destination for amazing products at great prices.</p>
              <div className="flex gap-4">
                {[1, 2, 3].map((i) => (
                  <motion.div 
                    key={i}
                    className="w-8 h-8 bg-slate-700 rounded-full cursor-pointer"
                    whileHover={{ scale: 1.2, backgroundColor: "#3b82f6" }}
                    transition={{ type: "spring", stiffness: 400 }}
                  />
                ))}
              </div>
            </motion.div>
            
            {[
              {
                title: "Quick Links",
                links: [
                  { name: "About Us", href: "/about" },
                  { name: "Contact", href: "#", action: () => alert('Contact us at: support@shophub.com | Phone: +1-800-SHOPHUB') },
                  { name: "FAQ", href: "#", action: () => alert('FAQ section coming soon! For immediate help, contact support.') },
                  { name: "Shipping", href: "#", action: () => alert('Free shipping on orders over $99. Standard delivery: 3-5 business days.') }
                ]
              },
              {
                title: "Categories",
                links: [
                  { name: "Electronics", href: "/shop?category=Electronics" },
                  { name: "Mobile", href: "/shop?category=Mobile" },
                  { name: "Audio", href: "/shop?category=Audio" },
                  { name: "Gaming", href: "/shop?category=Gaming" }
                ]
              },
              {
                title: "Customer Service",
                links: [
                  { name: "Track Order", href: "#", action: () => alert('Order tracking: Enter your order number on our tracking page.') },
                  { name: "Returns", href: "#", action: () => alert('Easy returns within 30 days. Contact support to initiate a return.') },
                  { name: "Support", href: "#", action: () => alert('24/7 Support: Email us at support@shophub.com') },
                  { name: "Size Guide", href: "#", action: () => alert('Size guides available on individual product pages.') }
                ]
              }
            ].map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: (index + 1) * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h5 className="text-white font-semibold mb-4">{section.title}</h5>
                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <motion.li key={link.name} whileHover={{ x: 5 }}>
                      {link.href.startsWith('/') ? (
                        <a href={link.href} className="hover:text-white transition-colors">{link.name}</a>
                      ) : (
                        <button
                          onClick={link.action}
                          className="hover:text-white transition-colors text-left"
                        >
                          {link.name}
                        </button>
                      )}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
          
          <motion.div 
            className="border-t border-slate-700 pt-8 mt-8 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <p>&copy; 2024 ShopHub. All rights reserved.</p>
          </motion.div>
        </div>
      </footer>
    </div>
  );
}
