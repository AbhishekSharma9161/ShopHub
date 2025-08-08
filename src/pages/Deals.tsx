import { useState, useRef, useEffect } from "react";
import { ShoppingCart, Heart, Star, Clock, Zap, Tag, ArrowRight, Timer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { motion, useInView } from "framer-motion";
import { allProducts } from "@/data/products";
import AuthDialog from "@/components/AuthDialog";

export default function Deals() {
  const [wishlistItems, setWishlistItems] = useState<number[]>([]);
  const [cartItems, setCartItems] = useState(0);
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 45,
    seconds: 30
  });
  
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true });

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Get products with highest discounts
  const flashDeals = allProducts
    .filter(product => product.discount > 15)
    .sort((a, b) => b.discount - a.discount)
    .slice(0, 4);

  const weeklyDeals = allProducts
    .filter(product => product.discount > 10 && product.discount <= 15)
    .slice(0, 6);

  const megaSale = allProducts
    .filter(product => product.discount > 20)
    .slice(0, 3);

  const toggleWishlist = (productId: number) => {
    setWishlistItems(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const addToCart = (productId: number) => {
    setCartItems(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <motion.header 
        className="border-b sticky top-0 bg-white/80 backdrop-blur-md z-50"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <motion.h1 
              className="text-2xl font-bold"
              whileHover={{ scale: 1.05 }}
            >
              <a href="/" className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                ShopHub
              </a>
            </motion.h1>
            <nav className="hidden md:flex items-center gap-6">
              <motion.a href="/" className="text-muted-foreground hover:text-primary transition-colors" whileHover={{ y: -2 }}>Home</motion.a>
              <motion.a href="/shop" className="text-muted-foreground hover:text-primary transition-colors" whileHover={{ y: -2 }}>Shop</motion.a>
              <motion.a href="/deals" className="text-foreground hover:text-primary transition-colors" whileHover={{ y: -2 }}>Deals</motion.a>
            </nav>
            <div className="flex items-center gap-2">
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                <Button variant="ghost" size="sm" className="relative">
                  <Heart className="h-5 w-5" />
                  {wishlistItems.length > 0 && (
                    <Badge variant="destructive" className="absolute -top-2 -right-2 h-5 w-5 p-0 text-xs">
                      {wishlistItems.length}
                    </Badge>
                  )}
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                <Button variant="ghost" size="sm" className="relative" asChild>
                  <a href="/cart">
                    <ShoppingCart className="h-5 w-5" />
                    {cartItems > 0 && (
                      <Badge variant="destructive" className="absolute -top-2 -right-2 h-5 w-5 p-0 text-xs">
                        {cartItems}
                      </Badge>
                    )}
                  </a>
                </Button>
              </motion.div>
              <AuthDialog>
                <Button variant="ghost" size="sm">Login</Button>
              </AuthDialog>
            </div>
          </div>
        </div>
      </motion.header>

      <div className="container mx-auto px-4 py-8" ref={containerRef}>
        {/* Hero Banner */}
        <motion.section 
          className="relative bg-gradient-to-r from-red-600 via-pink-600 to-purple-600 rounded-2xl p-8 md:p-12 mb-12 text-white overflow-hidden"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="absolute inset-0 bg-black/20" />
          <motion.div
            className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <Badge variant="secondary" className="mb-4 bg-white/20 text-white border-white/30">
                <Zap className="h-3 w-3 mr-1" />
                Limited Time Only
              </Badge>
              <h2 className="text-4xl md:text-6xl font-bold mb-4">
                Flash Sale
              </h2>
              <p className="text-xl md:text-2xl mb-8 opacity-90">
                Up to 50% off on selected items. Don't miss out!
              </p>
            </motion.div>
            
            {/* Countdown Timer */}
            <motion.div 
              className="flex gap-4 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <div className="text-center bg-white/20 rounded-lg p-3 min-w-[60px]">
                <div className="text-2xl font-bold">{timeLeft.hours.toString().padStart(2, '0')}</div>
                <div className="text-xs opacity-75">Hours</div>
              </div>
              <div className="text-center bg-white/20 rounded-lg p-3 min-w-[60px]">
                <div className="text-2xl font-bold">{timeLeft.minutes.toString().padStart(2, '0')}</div>
                <div className="text-xs opacity-75">Minutes</div>
              </div>
              <div className="text-center bg-white/20 rounded-lg p-3 min-w-[60px]">
                <div className="text-2xl font-bold">{timeLeft.seconds.toString().padStart(2, '0')}</div>
                <div className="text-xs opacity-75">Seconds</div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button size="lg" variant="secondary" className="px-8">
                Shop Flash Deals
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          </div>
        </motion.section>

        {/* Flash Deals */}
        <motion.section 
          className="mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-3xl font-bold flex items-center gap-3">
                <Zap className="text-yellow-500" />
                Flash Deals
              </h3>
              <p className="text-muted-foreground">Limited time offers with huge discounts</p>
            </div>
            <motion.div className="flex items-center gap-2 text-red-600">
              <Timer className="h-4 w-4" />
              <span className="text-sm font-medium">Ends in {timeLeft.hours}h {timeLeft.minutes}m</span>
            </motion.div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {flashDeals.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 * index, duration: 0.6 }}
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <Card className="group cursor-pointer hover:shadow-xl transition-all duration-300 overflow-hidden bg-white border-2 border-red-200 hover:border-red-400">
                  <div className="relative overflow-hidden">
                    <motion.img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3">
                      <Badge variant="destructive" className="bg-red-600 animate-pulse">
                        -{product.discount}% OFF
                      </Badge>
                    </div>
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute top-3 right-3 bg-white/80 hover:bg-white backdrop-blur-sm"
                        onClick={() => toggleWishlist(product.id)}
                      >
                        <Heart 
                          className={`h-4 w-4 transition-colors ${wishlistItems.includes(product.id) ? 'fill-red-500 text-red-500' : ''}`} 
                        />
                      </Button>
                    </motion.div>
                    
                    {/* Stock indicator */}
                    <div className="absolute bottom-3 left-3 right-3">
                      <div className="bg-white/90 rounded-lg p-2">
                        <div className="flex justify-between text-xs mb-1">
                          <span>Stock left</span>
                          <span className="font-semibold">{Math.floor(Math.random() * 10) + 5}</span>
                        </div>
                        <Progress value={Math.random() * 60 + 20} className="h-1" />
                      </div>
                    </div>
                  </div>
                  
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i}
                            className={`h-3 w-3 ${i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                          />
                        ))}
                      </div>
                      <span className="text-xs text-muted-foreground">({product.reviews})</span>
                    </div>
                    
                    <h4 className="font-semibold mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                      {product.name}
                    </h4>
                    
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-lg font-bold text-red-600">${product.price}</span>
                      {product.originalPrice && (
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
                        className="w-full bg-red-600 hover:bg-red-700" 
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
        </motion.section>

        {/* Mega Sale Section */}
        <motion.section 
          className="mb-16 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold mb-2">🔥 Mega Sale 🔥</h3>
            <p className="text-xl text-muted-foreground">Premium products at unbeatable prices</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {megaSale.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.2 + index * 0.1, duration: 0.6 }}
                whileHover={{ scale: 1.03 }}
              >
                <Card className="group cursor-pointer hover:shadow-2xl transition-all duration-300 overflow-hidden bg-white border-2 border-purple-200 hover:border-purple-400">
                  <div className="relative overflow-hidden">
                    <motion.img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                        MEGA DEAL
                      </Badge>
                    </div>
                    <div className="absolute bottom-4 left-4 text-white">
                      <h4 className="text-lg font-bold">{product.name}</h4>
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold">${product.price}</span>
                        <span className="text-sm line-through opacity-75">${product.originalPrice}</span>
                      </div>
                    </div>
                  </div>
                  
                  <CardContent className="p-4">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button 
                        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700" 
                        onClick={() => addToCart(product.id)}
                      >
                        Grab This Deal
                      </Button>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Weekly Deals */}
        <motion.section 
          className="mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-3xl font-bold flex items-center gap-3">
                <Tag className="text-green-500" />
                Weekly Deals
              </h3>
              <p className="text-muted-foreground">Great savings that last all week</p>
            </div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button variant="outline">
                View All Deals
              </Button>
            </motion.div>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {weeklyDeals.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 * index, duration: 0.6 }}
                whileHover={{ y: -5 }}
              >
                <Card className="group cursor-pointer hover:shadow-xl transition-all duration-300 overflow-hidden bg-white border-2 border-transparent hover:border-green-200">
                  <div className="relative overflow-hidden">
                    <motion.img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3">
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        -{product.discount}% OFF
                      </Badge>
                    </div>
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute top-3 right-3 bg-white/80 hover:bg-white backdrop-blur-sm"
                        onClick={() => toggleWishlist(product.id)}
                      >
                        <Heart 
                          className={`h-4 w-4 transition-colors ${wishlistItems.includes(product.id) ? 'fill-red-500 text-red-500' : ''}`} 
                        />
                      </Button>
                    </motion.div>
                  </div>
                  
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i}
                            className={`h-3 w-3 ${i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                          />
                        ))}
                      </div>
                      <span className="text-xs text-muted-foreground">({product.reviews})</span>
                    </div>
                    
                    <h4 className="font-semibold mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                      {product.name}
                    </h4>
                    
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-lg font-bold">${product.price}</span>
                      {product.originalPrice && (
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
                        className="w-full bg-green-600 hover:bg-green-700" 
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
        </motion.section>

        {/* Newsletter Signup */}
        <motion.section 
          className="text-center py-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl text-white"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <h3 className="text-3xl font-bold mb-4">Never Miss a Deal!</h3>
          <p className="text-xl mb-8 opacity-90">Get notified about flash sales and exclusive offers</p>
          <div className="flex max-w-md mx-auto gap-4">
            <input 
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900"
            />
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button size="lg" variant="secondary">
                Subscribe
              </Button>
            </motion.div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
