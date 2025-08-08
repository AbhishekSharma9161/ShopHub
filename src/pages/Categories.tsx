import { useState, useRef } from "react";
import { ShoppingCart, Heart, Star, ArrowRight, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { motion, useInView } from "framer-motion";
import { categories, allProducts } from "@/data/products";
import AuthDialog from "@/components/AuthDialog";

export default function Categories() {
  const [wishlistItems, setWishlistItems] = useState<number[]>([]);
  const [cartItems, setCartItems] = useState(0);
  
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true });

  // Get top products for each category
  const getCategoryProducts = (categoryName: string) => {
    return allProducts
      .filter(product => product.category === categoryName)
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 3);
  };

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
              <motion.a href="/categories" className="text-foreground hover:text-primary transition-colors" whileHover={{ y: -2 }}>Categories</motion.a>
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
        {/* Page Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold mb-4">Shop by Category</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore our wide range of products organized by categories. Find exactly what you're looking for.
          </p>
        </motion.div>

        {/* Categories Grid */}
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
        >
          {categories.filter(cat => cat.name !== "All").map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ y: -10 }}
            >
              <Card className="overflow-hidden group cursor-pointer bg-gradient-to-br from-white to-slate-50 border-2 border-transparent hover:border-primary/20 hover:shadow-xl transition-all duration-300">
                <div className="relative overflow-hidden">
                  <motion.img 
                    src={category.image} 
                    alt={category.name}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <div className="text-3xl mb-2">{category.icon}</div>
                    <h3 className="text-2xl font-bold">{category.name}</h3>
                    <p className="text-sm opacity-90">{category.count} products</p>
                  </div>
                  <motion.div
                    className="absolute top-4 right-4"
                    whileHover={{ scale: 1.1 }}
                  >
                    <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      Trending
                    </Badge>
                  </motion.div>
                </div>
                
                <CardContent className="p-6">
                  <p className="text-muted-foreground mb-4">{category.description}</p>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button 
                      className="w-full bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90"
                      asChild
                    >
                      <a href={`/shop?category=${category.name}`}>
                        Browse {category.name}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Featured Products by Category */}
        {categories.filter(cat => cat.name !== "All").map((category, categoryIndex) => {
          const categoryProducts = getCategoryProducts(category.name);
          if (categoryProducts.length === 0) return null;

          return (
            <motion.section 
              key={category.name}
              className="mb-16"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: (categoryIndex + 3) * 0.1, duration: 0.6 }}
            >
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-2xl font-bold flex items-center gap-3">
                    <span className="text-3xl">{category.icon}</span>
                    Best in {category.name}
                  </h3>
                  <p className="text-muted-foreground">Top-rated products in this category</p>
                </div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button variant="outline" asChild>
                    <a href={`/shop?category=${category.name}`}>
                      View All {category.name}
                    </a>
                  </Button>
                </motion.div>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {categoryProducts.map((product, productIndex) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: (categoryIndex + 3) * 0.1 + productIndex * 0.1, duration: 0.6 }}
                    whileHover={{ y: -5, scale: 1.02 }}
                  >
                    <Card className="group cursor-pointer hover:shadow-xl transition-all duration-300 overflow-hidden bg-white border-2 border-transparent hover:border-primary/20">
                      <div className="relative overflow-hidden">
                        <motion.img 
                          src={product.image} 
                          alt={product.name}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                          whileHover={{ scale: 1.1 }}
                        />
                        <div className="absolute top-3 left-3 flex gap-2">
                          {product.isNew && (
                            <Badge variant="secondary" className="bg-green-100 text-green-800">New</Badge>
                          )}
                          {product.discount > 0 && (
                            <Badge variant="destructive">-{product.discount}%</Badge>
                          )}
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
                        
                        <p className="text-sm text-muted-foreground mb-2">{product.brand}</p>
                        
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
            </motion.section>
          );
        })}

        {/* Call to Action */}
        <motion.section 
          className="text-center py-16 bg-gradient-to-r from-primary to-blue-600 rounded-2xl text-white"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <h3 className="text-3xl font-bold mb-4">Can't Find What You're Looking For?</h3>
          <p className="text-xl mb-8 opacity-90">Browse our complete product catalog with advanced filters</p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button size="lg" variant="secondary" className="px-8" asChild>
              <a href="/shop">
                Browse All Products
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </motion.div>
        </motion.section>
      </div>
    </div>
  );
}
