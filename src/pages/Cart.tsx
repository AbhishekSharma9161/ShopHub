import { useState, useRef } from "react";
import { ShoppingCart, Minus, Plus, Trash2, ArrowLeft, ShieldCheck, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { motion, useInView, AnimatePresence } from "framer-motion";

interface CartItem {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  quantity: number;
  color?: string;
  size?: string;
}

const initialCartItems: CartItem[] = [
  {
    id: 1,
    name: "Premium Wireless Headphones",
    price: 299.99,
    originalPrice: 399.99,
    image: "https://images.pexels.com/photos/3568518/pexels-photo-3568518.jpeg",
    quantity: 1,
    color: "Black"
  },
  {
    id: 2,
    name: "Smart Fitness Watch",
    price: 199.99,
    originalPrice: 249.99,
    image: "https://images.pexels.com/photos/179908/pexels-photo-179908.jpeg",
    quantity: 2,
    color: "Silver",
    size: "42mm"
  },
  {
    id: 3,
    name: "Gaming Mechanical Keyboard",
    price: 129.99,
    originalPrice: 179.99,
    image: "https://images.pexels.com/photos/671629/pexels-photo-671629.jpeg",
    quantity: 1,
    color: "RGB"
  }
];

export default function Cart() {
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);
  const [promoCode, setPromoCode] = useState("");
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true });

  const updateQuantity = (id: number, change: number) => {
    setCartItems(items => 
      items.map(item => 
        item.id === id 
          ? { ...item, quantity: Math.max(0, item.quantity + change) }
          : item
      ).filter(item => item.quantity > 0)
    );
  };

  const removeItem = (id: number) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const applyPromoCode = () => {
    setIsLoading(true);
    setTimeout(() => {
      if (promoCode.toUpperCase() === "SAVE10") {
        setAppliedPromo("SAVE10");
        setPromoCode("");
      }
      setIsLoading(false);
    }, 1000);
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const savings = cartItems.reduce((sum, item) => 
    sum + ((item.originalPrice || item.price) - item.price) * item.quantity, 0
  );
  const promoDiscount = appliedPromo === "SAVE10" ? subtotal * 0.1 : 0;
  const shipping = subtotal > 99 ? 0 : 9.99;
  const tax = (subtotal - promoDiscount) * 0.08;
  const total = subtotal - promoDiscount + shipping + tax;

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        {/* Header */}
        <motion.header 
          className="border-b"
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
                <a href="/" className="text-muted-foreground hover:text-primary transition-colors">Home</a>
                <a href="/shop" className="text-muted-foreground hover:text-primary transition-colors">Shop</a>
                <a href="/cart" className="text-foreground">Cart</a>
              </nav>
            </div>
          </div>
        </motion.header>

        <motion.div 
          className="container mx-auto px-4 py-16 text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            animate={{ 
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              repeatDelay: 3
            }}
          >
            <ShoppingCart className="h-24 w-24 mx-auto text-muted-foreground mb-6" />
          </motion.div>
          <motion.h2 
            className="text-2xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Your cart is empty
          </motion.h2>
          <motion.p 
            className="text-muted-foreground mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Start shopping to add items to your cart
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button asChild className="bg-gradient-to-r from-primary to-blue-600">
              <a href="/shop">Continue Shopping</a>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div 
      className="min-h-screen bg-slate-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Header */}
      <motion.header 
        className="border-b bg-white"
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
              <a href="/" className="text-muted-foreground hover:text-primary transition-colors">Home</a>
              <a href="/shop" className="text-muted-foreground hover:text-primary transition-colors">Shop</a>
              <a href="/cart" className="text-foreground">Cart</a>
            </nav>
          </div>
        </div>
      </motion.header>

      <div className="container mx-auto px-4 py-8" ref={containerRef}>
        {/* Breadcrumb */}
        <motion.div 
          className="flex items-center gap-2 mb-6"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button variant="ghost" size="sm" asChild>
              <a href="/shop">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Continue Shopping
              </a>
            </Button>
          </motion.div>
        </motion.div>

        <motion.div 
          className="grid lg:grid-cols-3 gap-8"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          {/* Cart Items */}
          <motion.div 
            className="lg:col-span-2"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <Card className="overflow-hidden">
              <CardContent className="p-6">
                <motion.h2 
                  className="text-2xl font-bold mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                >
                  Shopping Cart ({cartItems.length} items)
                </motion.h2>
                
                <div className="space-y-6">
                  <AnimatePresence>
                    {cartItems.map((item, index) => (
                      <motion.div 
                        key={item.id} 
                        className="flex gap-4 p-4 border rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20, scale: 0.9 }}
                        transition={{ delay: index * 0.1, duration: 0.5 }}
                        layout
                      >
                        <motion.img 
                          src={item.image} 
                          alt={item.name}
                          className="w-20 h-20 object-cover rounded-lg"
                          whileHover={{ scale: 1.1 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        />
                        
                        <div className="flex-1">
                          <motion.h3 
                            className="font-semibold mb-1"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 + index * 0.1 }}
                          >
                            {item.name}
                          </motion.h3>
                          <div className="flex gap-4 text-sm text-muted-foreground mb-2">
                            {item.color && <span>Color: {item.color}</span>}
                            {item.size && <span>Size: {item.size}</span>}
                          </div>
                          
                          <div className="flex items-center gap-2 mb-2">
                            <span className="font-semibold">${item.price}</span>
                            {item.originalPrice && item.originalPrice > item.price && (
                              <span className="text-sm text-muted-foreground line-through">
                                ${item.originalPrice}
                              </span>
                            )}
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 bg-slate-50 rounded-lg p-1">
                              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => updateQuantity(item.id, -1)}
                                  className="h-8 w-8 p-0"
                                >
                                  <Minus className="h-3 w-3" />
                                </Button>
                              </motion.div>
                              <motion.span 
                                className="w-8 text-center font-semibold"
                                key={item.quantity}
                                initial={{ scale: 1.2 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", stiffness: 300 }}
                              >
                                {item.quantity}
                              </motion.span>
                              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => updateQuantity(item.id, 1)}
                                  className="h-8 w-8 p-0"
                                >
                                  <Plus className="h-3 w-3" />
                                </Button>
                              </motion.div>
                            </div>
                            
                            <motion.div
                              whileHover={{ scale: 1.1, rotate: 5 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => removeItem(item.id)}
                                className="text-destructive hover:text-destructive hover:bg-destructive/10"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </motion.div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </CardContent>
            </Card>

            {/* Promo Code */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <Card className="mt-6">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4">Promo Code</h3>
                  <div className="flex gap-2">
                    <Input 
                      placeholder="Enter promo code"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="flex-1"
                    />
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button 
                        onClick={applyPromoCode}
                        disabled={isLoading}
                        className="bg-gradient-to-r from-primary to-blue-600"
                      >
                        {isLoading ? "Applying..." : "Apply"}
                      </Button>
                    </motion.div>
                  </div>
                  <AnimatePresence>
                    {appliedPromo && (
                      <motion.div 
                        className="mt-2 text-sm text-green-600"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                      >
                        ✓ Promo code "{appliedPromo}" applied!
                      </motion.div>
                    )}
                  </AnimatePresence>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <Card className="sticky top-8 overflow-hidden">
              <CardContent className="p-6">
                <motion.h3 
                  className="text-xl font-bold mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                >
                  Order Summary
                </motion.h3>
                
                <motion.div 
                  className="space-y-3 mb-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                >
                  <div className="flex justify-between">
                    <span>Subtotal ({cartItems.length} items)</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  
                  {savings > 0 && (
                    <motion.div 
                      className="flex justify-between text-green-600"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <span>Savings</span>
                      <span>-${savings.toFixed(2)}</span>
                    </motion.div>
                  )}
                  
                  <AnimatePresence>
                    {appliedPromo && (
                      <motion.div 
                        className="flex justify-between text-green-600"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <span>Promo ({appliedPromo})</span>
                        <span>-${promoDiscount.toFixed(2)}</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className={shipping === 0 ? "text-green-600 font-semibold" : ""}>
                      {shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  
                  <Separator />
                  
                  <motion.div 
                    className="flex justify-between text-lg font-bold"
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, delay: 0.7 }}
                  >
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </motion.div>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="mb-4"
                >
                  <Button className="w-full bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90" size="lg">
                    Proceed to Checkout
                  </Button>
                </motion.div>
                
                <div className="space-y-3 text-sm text-muted-foreground">
                  <motion.div 
                    className="flex items-center gap-2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                  >
                    <ShieldCheck className="h-4 w-4 text-green-500" />
                    <span>Secure checkout with SSL encryption</span>
                  </motion.div>
                  <motion.div 
                    className="flex items-center gap-2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.9, duration: 0.6 }}
                  >
                    <Truck className="h-4 w-4 text-blue-500" />
                    <span>Free shipping on orders over $99</span>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}
