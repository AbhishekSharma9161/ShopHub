import { useState, useRef, useEffect } from "react";
import { ShoppingCart, Heart, Star, Filter, Grid, List, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { motion, useInView } from "framer-motion";
import { allProducts, brands } from "@/data/products";
import AuthDialog from "@/components/AuthDialog";

const categories = ["All", "Mobile", "Electronics", "Audio", "Gaming", "Wearables", "Photography"];

export default function Shop() {
  const [products] = useState(allProducts);
  const [filteredProducts, setFilteredProducts] = useState(allProducts);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [priceRange, setPriceRange] = useState([0, 3000]);
  const [sortBy, setSortBy] = useState("featured");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [wishlistItems, setWishlistItems] = useState<number[]>([]);
  const [cartItems, setCartItems] = useState(0);

  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true });

  // Check URL parameters on component mount
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const categoryParam = urlParams.get('category');
    if (categoryParam && categories.includes(categoryParam)) {
      setSelectedCategory(categoryParam);
    }
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

  // Filter products based on selected criteria
  const filterProducts = () => {
    let filtered = allProducts;

    // Filter by category
    if (selectedCategory !== "All") {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Filter by brand
    if (selectedBrand !== "All") {
      filtered = filtered.filter(product => product.brand === selectedBrand);
    }

    // Filter by price range
    filtered = filtered.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Sort products
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      default:
        // Featured - keep original order
        break;
    }

    setFilteredProducts(filtered);
  };

  // Apply filters when dependencies change
  useEffect(() => {
    filterProducts();
  }, [selectedCategory, selectedBrand, priceRange, sortBy]);

  const clearFilters = () => {
    setSelectedCategory("All");
    setSelectedBrand("All");
    setPriceRange([0, 3000]);
    setSortBy("featured");
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
              <motion.a href="/shop" className="text-foreground hover:text-primary transition-colors" whileHover={{ y: -2 }}>Shop</motion.a>
              <motion.a href="/categories" className="text-muted-foreground hover:text-primary transition-colors" whileHover={{ y: -2 }}>Categories</motion.a>
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

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold mb-2">Shop All Products</h2>
          <p className="text-muted-foreground">Discover amazing products from top brands</p>
        </motion.div>

        <div className="flex gap-8">
          {/* Sidebar Filters */}
          <motion.aside 
            className={`w-64 space-y-6 ${showFilters ? 'block' : 'hidden lg:block'}`}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold">Filters</h3>
                  <Button variant="ghost" size="sm" onClick={clearFilters} className="text-xs">
                    Clear All
                  </Button>
                </div>
                
                <div className="space-y-6">
                  {/* Categories */}
                  <div>
                    <h4 className="font-medium mb-3">Categories</h4>
                    <div className="space-y-2">
                      {categories.map((category) => (
                        <motion.div 
                          key={category} 
                          className="flex items-center space-x-2"
                          whileHover={{ x: 5 }}
                        >
                          <Checkbox 
                            id={category}
                            checked={selectedCategory === category}
                            onCheckedChange={() => setSelectedCategory(category)}
                          />
                          <label htmlFor={category} className="text-sm cursor-pointer">
                            {category}
                          </label>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Brands */}
                  <div>
                    <h4 className="font-medium mb-3">Brands</h4>
                    <div className="space-y-2">
                      {brands.map((brand) => (
                        <motion.div 
                          key={brand} 
                          className="flex items-center space-x-2"
                          whileHover={{ x: 5 }}
                        >
                          <Checkbox 
                            id={brand}
                            checked={selectedBrand === brand}
                            onCheckedChange={() => setSelectedBrand(brand)}
                          />
                          <label htmlFor={brand} className="text-sm cursor-pointer">
                            {brand}
                          </label>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Price Range */}
                  <div>
                    <h4 className="font-medium mb-3">Price Range</h4>
                    <div className="space-y-4">
                      <Slider
                        value={priceRange}
                        onValueChange={setPriceRange}
                        max={3000}
                        step={50}
                        className="w-full"
                      />
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>${priceRange[0]}</span>
                        <span>${priceRange[1]}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.aside>

          {/* Main Content */}
          <main className="flex-1">
            {/* Toolbar */}
            <motion.div 
              className="flex items-center justify-between mb-6 bg-slate-50 p-4 rounded-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden"
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>
                <span className="text-sm text-muted-foreground">
                  {filteredProducts.length} products found
                </span>
                {(selectedCategory !== "All" || selectedBrand !== "All") && (
                  <div className="flex gap-2">
                    {selectedCategory !== "All" && (
                      <Badge variant="secondary" className="text-xs">
                        {selectedCategory}
                        <button 
                          onClick={() => setSelectedCategory("All")}
                          className="ml-1 hover:text-destructive"
                        >
                          ×
                        </button>
                      </Badge>
                    )}
                    {selectedBrand !== "All" && (
                      <Badge variant="secondary" className="text-xs">
                        {selectedBrand}
                        <button 
                          onClick={() => setSelectedBrand("All")}
                          className="ml-1 hover:text-destructive"
                        >
                          ×
                        </button>
                      </Badge>
                    )}
                  </div>
                )}
              </div>

              <div className="flex items-center gap-4">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">Featured</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                    <SelectItem value="newest">Newest</SelectItem>
                  </SelectContent>
                </Select>

                <div className="flex border rounded-lg">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    className="rounded-r-none"
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className="rounded-l-none"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </motion.div>

            {/* Products Grid */}
            <motion.div 
              ref={containerRef}
              className={`grid gap-6 ${viewMode === "grid" ? "sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"}`}
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6 }}
            >
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    whileHover={{ y: -5, scale: 1.02 }}
                  >
                    <Card className="group cursor-pointer hover:shadow-xl transition-all duration-300 overflow-hidden bg-white border-2 border-transparent hover:border-primary/20">
                      <div className="relative overflow-hidden">
                        <motion.img 
                          src={product.image} 
                          alt={product.name}
                          className={`w-full object-cover group-hover:scale-105 transition-transform duration-300 ${
                            viewMode === "grid" ? "h-48" : "h-32"
                          }`}
                          whileHover={{ scale: 1.1 }}
                        />
                        <div className="absolute top-3 left-3 flex gap-2">
                          {product.isNew && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ delay: 0.2 + index * 0.05 }}
                            >
                              <Badge variant="secondary" className="bg-green-100 text-green-800">New</Badge>
                            </motion.div>
                          )}
                          {product.discount > 0 && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ delay: 0.3 + index * 0.05 }}
                            >
                              <Badge variant="destructive">-{product.discount}%</Badge>
                            </motion.div>
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
                              <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.4 + i * 0.02 + index * 0.05 }}
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
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <p className="text-lg text-muted-foreground mb-4">No products found</p>
                    <p className="text-sm text-muted-foreground mb-6">Try adjusting your filters or search criteria</p>
                    <Button onClick={clearFilters} variant="outline">
                      Clear Filters
                    </Button>
                  </motion.div>
                </div>
              )}
            </motion.div>

            {/* Pagination */}
            {filteredProducts.length > 0 && (
              <motion.div 
                className="flex justify-center mt-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                <div className="flex items-center gap-2">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button variant="outline" size="sm">Previous</Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button variant="default" size="sm">1</Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button variant="outline" size="sm">2</Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button variant="outline" size="sm">3</Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button variant="outline" size="sm">Next</Button>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
