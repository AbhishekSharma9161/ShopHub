import { ReactNode, useState } from "react";
import { ShoppingCart, Heart, User, Search, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

interface LayoutProps {
  children: ReactNode;
  cartItems?: number;
  wishlistItems?: number;
}

export default function Layout({ children, cartItems = 0, wishlistItems = 0 }: LayoutProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop" },
    { name: "Categories", href: "/categories" },
    { name: "Deals", href: "/deals" },
    { name: "About", href: "/about" }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b sticky top-0 bg-white/80 backdrop-blur-md z-50">
        <div className="container mx-auto px-4">
          {/* Top bar */}
          <div className="flex items-center justify-between py-2 text-sm text-muted-foreground border-b">
            <span>Free shipping on orders over $99</span>
            <div className="flex items-center gap-4">
              <span className="hidden sm:inline">Track Order</span>
              <span className="hidden sm:inline">Help</span>
              <span>EN</span>
            </div>
          </div>
          
          {/* Main header */}
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-8">
              <h1 className="text-2xl font-bold">
                <a href="/" className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                  ShopHub
                </a>
              </h1>
              <nav className="hidden md:flex items-center gap-6">
                {navigation.map((item) => (
                  <a 
                    key={item.name}
                    href={item.href} 
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {item.name}
                  </a>
                ))}
              </nav>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input 
                    placeholder="Search products..." 
                    className="pl-10 w-64"
                  />
                </div>
              </div>
              
              <Button variant="ghost" size="sm">
                <User className="h-5 w-5" />
              </Button>
              
              <Button variant="ghost" size="sm" className="relative">
                <Heart className="h-5 w-5" />
                {wishlistItems > 0 && (
                  <Badge variant="destructive" className="absolute -top-2 -right-2 h-5 w-5 p-0 text-xs">
                    {wishlistItems}
                  </Badge>
                )}
              </Button>
              
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
              
              {/* Mobile menu */}
              <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="sm" className="md:hidden">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                  <div className="flex flex-col h-full">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-lg font-semibold">Menu</h2>
                    </div>
                    
                    <div className="mb-6">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                        <Input 
                          placeholder="Search products..." 
                          className="pl-10"
                        />
                      </div>
                    </div>
                    
                    <nav className="flex flex-col space-y-4">
                      {navigation.map((item) => (
                        <a 
                          key={item.name}
                          href={item.href}
                          className="text-lg hover:text-primary transition-colors"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {item.name}
                        </a>
                      ))}
                    </nav>
                    
                    <div className="mt-auto pt-6 border-t">
                      <div className="space-y-4">
                        <Button variant="outline" className="w-full" asChild>
                          <a href="/account">My Account</a>
                        </Button>
                        <Button className="w-full">Sign In</Button>
                      </div>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 py-12 mt-auto">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-white font-bold text-xl mb-4">ShopHub</h4>
              <p className="mb-4">Your one-stop destination for amazing products at great prices.</p>
              <div className="flex gap-4">
                <div className="w-8 h-8 bg-slate-700 rounded-full"></div>
                <div className="w-8 h-8 bg-slate-700 rounded-full"></div>
                <div className="w-8 h-8 bg-slate-700 rounded-full"></div>
              </div>
            </div>
            
            <div>
              <h5 className="text-white font-semibold mb-4">Quick Links</h5>
              <ul className="space-y-2">
                <li><a href="/about" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="/contact" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="/faq" className="hover:text-white transition-colors">FAQ</a></li>
                <li><a href="/shipping" className="hover:text-white transition-colors">Shipping</a></li>
              </ul>
            </div>
            
            <div>
              <h5 className="text-white font-semibold mb-4">Categories</h5>
              <ul className="space-y-2">
                <li><a href="/categories/electronics" className="hover:text-white transition-colors">Electronics</a></li>
                <li><a href="/categories/fashion" className="hover:text-white transition-colors">Fashion</a></li>
                <li><a href="/categories/home" className="hover:text-white transition-colors">Home</a></li>
                <li><a href="/categories/sports" className="hover:text-white transition-colors">Sports</a></li>
              </ul>
            </div>
            
            <div>
              <h5 className="text-white font-semibold mb-4">Customer Service</h5>
              <ul className="space-y-2">
                <li><a href="/track-order" className="hover:text-white transition-colors">Track Order</a></li>
                <li><a href="/returns" className="hover:text-white transition-colors">Returns</a></li>
                <li><a href="/support" className="hover:text-white transition-colors">Support</a></li>
                <li><a href="/size-guide" className="hover:text-white transition-colors">Size Guide</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-700 pt-8 mt-8 text-center">
            <p>&copy; 2024 ShopHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
