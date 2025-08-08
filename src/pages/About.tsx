import { useState, useRef } from "react";
import { ShoppingCart, Heart, Users, Award, Shield, Truck, HeadphonesIcon, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { motion, useInView } from "framer-motion";
import AuthDialog from "@/components/AuthDialog";

const stats = [
  { label: "Happy Customers", value: "50K+", icon: Users },
  { label: "Products Sold", value: "1M+", icon: ShoppingCart },
  { label: "Years Experience", value: "10+", icon: Award },
  { label: "Countries Served", value: "25+", icon: Globe }
];

const features = [
  {
    icon: Shield,
    title: "Secure Shopping",
    description: "Your data and payments are protected with industry-leading security measures."
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    description: "Quick and reliable shipping to get your products to you as soon as possible."
  },
  {
    icon: HeadphonesIcon,
    title: "24/7 Support",
    description: "Our customer support team is always ready to help you with any questions."
  },
  {
    icon: Award,
    title: "Quality Guarantee",
    description: "We stand behind every product with our comprehensive quality guarantee."
  }
];

const teamMembers = [
  {
    name: "Sarah Johnson",
    role: "CEO & Founder",
    description: "Visionary leader with 15 years in e-commerce",
    image: "https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg"
  },
  {
    name: "Mike Chen",
    role: "CTO",
    description: "Tech expert ensuring seamless user experience",
    image: "https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg"
  },
  {
    name: "Emily Rodriguez",
    role: "Head of Customer Success",
    description: "Dedicated to making every customer happy",
    image: "https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg"
  }
];

export default function About() {
  const [wishlistItems, setWishlistItems] = useState<number[]>([]);
  const [cartItems, setCartItems] = useState(0);
  
  const containerRef = useRef(null);
  const statsRef = useRef(null);
  const featuresRef = useRef(null);
  const teamRef = useRef(null);
  
  const isInView = useInView(containerRef, { once: true });
  const statsInView = useInView(statsRef, { once: true });
  const featuresInView = useInView(featuresRef, { once: true });
  const teamInView = useInView(teamRef, { once: true });

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
              <motion.a href="/about" className="text-foreground hover:text-primary transition-colors" whileHover={{ y: -2 }}>About</motion.a>
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
        {/* Hero Section */}
        <motion.section 
          className="text-center py-16 mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.h2 
            className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            About ShopHub
          </motion.h2>
          <motion.p 
            className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            We're passionate about bringing you the latest and greatest products from top brands around the world. 
            Since our founding in 2014, we've been committed to providing exceptional shopping experiences with 
            unbeatable prices, fast shipping, and outstanding customer service.
          </motion.p>
        </motion.section>

        {/* Stats Section */}
        <motion.section 
          ref={statsRef}
          className="mb-20"
          initial={{ opacity: 0, y: 50 }}
          animate={statsInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                animate={statsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ scale: 1.05 }}
              >
                <Card className="text-center p-6 bg-gradient-to-br from-white to-slate-50 border-2 border-transparent hover:border-primary/20 transition-all duration-300">
                  <CardContent className="p-0">
                    <motion.div
                      whileHover={{ rotate: 10, scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <stat.icon className="h-12 w-12 mx-auto mb-4 text-primary" />
                    </motion.div>
                    <motion.h3 
                      className="text-3xl font-bold mb-2"
                      initial={{ scale: 0 }}
                      animate={statsInView ? { scale: 1 } : {}}
                      transition={{ delay: 0.3 + index * 0.1, type: "spring", stiffness: 200 }}
                    >
                      {stat.value}
                    </motion.h3>
                    <p className="text-muted-foreground">{stat.label}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Mission Section */}
        <motion.section 
          className="mb-20 bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl p-8 md:p-12"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <motion.h3 
                className="text-3xl font-bold mb-6"
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.8, duration: 0.6 }}
              >
                Our Mission
              </motion.h3>
              <motion.p 
                className="text-lg text-muted-foreground mb-6 leading-relaxed"
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 1.0, duration: 0.6 }}
              >
                To make quality products accessible to everyone by connecting customers with trusted brands 
                and providing an exceptional shopping experience that exceeds expectations.
              </motion.p>
              <motion.p 
                className="text-lg text-muted-foreground leading-relaxed"
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 1.2, duration: 0.6 }}
              >
                We believe that great products should be within everyone's reach, and we work tirelessly 
                to negotiate the best prices while maintaining the highest standards of quality and service.
              </motion.p>
            </div>
            <motion.div 
              className="relative"
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              <div className="bg-gradient-to-br from-primary/10 to-blue-600/10 rounded-2xl p-8 transform rotate-3">
                <img 
                  src="https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg" 
                  alt="Our Mission" 
                  className="w-full h-64 object-cover rounded-lg transform -rotate-3"
                />
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Features Section */}
        <motion.section 
          ref={featuresRef}
          className="mb-20"
          initial={{ opacity: 0, y: 50 }}
          animate={featuresInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.h3 
            className="text-3xl font-bold text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={featuresInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            Why Choose ShopHub?
          </motion.h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                animate={featuresInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ y: -5 }}
              >
                <Card className="text-center p-6 h-full bg-white border-2 border-transparent hover:border-primary/20 hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-0">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <feature.icon className="h-12 w-12 mx-auto mb-4 text-primary" />
                    </motion.div>
                    <h4 className="text-xl font-semibold mb-3">{feature.title}</h4>
                    <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Team Section */}
        <motion.section 
          ref={teamRef}
          className="mb-20"
          initial={{ opacity: 0, y: 50 }}
          animate={teamInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.h3 
            className="text-3xl font-bold text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={teamInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            Meet Our Team
          </motion.h3>
          <div className="grid md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                animate={teamInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                whileHover={{ y: -5 }}
              >
                <Card className="text-center overflow-hidden bg-white border-2 border-transparent hover:border-primary/20 hover:shadow-xl transition-all duration-300">
                  <div className="relative overflow-hidden">
                    <motion.img 
                      src={member.image} 
                      alt={member.name}
                      className="w-full h-64 object-cover"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.4 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <h4 className="text-xl font-bold">{member.name}</h4>
                      <p className="text-sm opacity-90">{member.role}</p>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <p className="text-muted-foreground">{member.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Values Section */}
        <motion.section 
          className="mb-20 bg-gradient-to-r from-primary to-blue-600 rounded-2xl p-8 md:p-12 text-white"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <div className="text-center">
            <motion.h3 
              className="text-3xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1.0, duration: 0.6 }}
            >
              Our Values
            </motion.h3>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { title: "Customer First", description: "Every decision we make prioritizes our customers' needs and satisfaction." },
                { title: "Quality Assurance", description: "We partner only with trusted brands and rigorously test all products." },
                { title: "Innovation", description: "We continuously improve our platform and services to stay ahead." }
              ].map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 1.2 + index * 0.1, duration: 0.6 }}
                >
                  <h4 className="text-xl font-semibold mb-3">{value.title}</h4>
                  <p className="opacity-90">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Contact CTA */}
        <motion.section 
          className="text-center py-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.0, duration: 0.8 }}
        >
          <h3 className="text-3xl font-bold mb-6">Get in Touch</h3>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Have questions about our products or services? We'd love to hear from you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button size="lg" className="px-8 bg-gradient-to-r from-primary to-blue-600">
                Contact Support
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button size="lg" variant="outline" className="px-8" asChild>
                <a href="/shop">Start Shopping</a>
              </Button>
            </motion.div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
