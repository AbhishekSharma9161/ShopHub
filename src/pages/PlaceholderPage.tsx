import { ArrowLeft, Construction } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface PlaceholderPageProps {
  title: string;
  description: string;
}

export default function PlaceholderPage({ title, description }: PlaceholderPageProps) {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">
              <a href="/" className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                ShopHub
              </a>
            </h1>
            <nav className="hidden md:flex items-center gap-6">
              <a href="/" className="text-muted-foreground hover:text-primary transition-colors">Home</a>
              <a href="/shop" className="text-muted-foreground hover:text-primary transition-colors">Shop</a>
              <a href="/cart" className="text-muted-foreground hover:text-primary transition-colors">Cart</a>
            </nav>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <Card>
            <CardContent className="p-12">
              <Construction className="h-16 w-16 mx-auto text-muted-foreground mb-6" />
              <h2 className="text-3xl font-bold mb-4">{title}</h2>
              <p className="text-lg text-muted-foreground mb-8">{description}</p>
              <p className="text-muted-foreground mb-8">
                This page is currently under development. Please continue exploring other sections of our store.
              </p>
              <div className="flex gap-4 justify-center">
                <Button asChild>
                  <a href="/">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Home
                  </a>
                </Button>
                <Button variant="outline" asChild>
                  <a href="/shop">Browse Products</a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
