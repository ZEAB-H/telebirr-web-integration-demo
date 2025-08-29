import { Header } from "@/components/Header";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Shield, Zap, Award, Users } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-10"></div>
        <div className="container mx-auto text-center relative z-10">
          <Badge className="mb-6 bg-primary/10 text-primary border-primary/20">
            New Launch
          </Badge>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-hero bg-clip-text text-transparent leading-tight">
            Shop with Confidence
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Experience seamless payments with Ethiopia's most trusted digital
            payment platform
          </p>
          <Button variant="hero" size="lg">
            Explore Products
          </Button>
        </div>
      </section>

      {/* Featured Product */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">Featured Product</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Premium quality headphones with secure Telebirr payment
              integration
            </p>
          </div>

          <div className="flex justify-center">
            <ProductCard />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-primary-foreground" />
              </div>
              <h4 className="font-semibold mb-2">Secure Payments</h4>
              <p className="text-sm text-muted-foreground">
                Bank-grade security for all transactions
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-primary-foreground" />
              </div>
              <h4 className="font-semibold mb-2">Instant Processing</h4>
              <p className="text-sm text-muted-foreground">
                Lightning-fast payment processing
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-primary-foreground" />
              </div>
              <h4 className="font-semibold mb-2">Trusted Platform</h4>
              <p className="text-sm text-muted-foreground">
                Ethiopia's #1 payment solution
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-primary-foreground" />
              </div>
              <h4 className="font-semibold mb-2">24/7 Support</h4>
              <p className="text-sm text-muted-foreground">
                Round-the-clock customer service
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-primary text-primary-foreground">
        <div className="container mx-auto text-center">
          <div className="mb-6">
            <h5 className="text-2xl font-bold mb-2">Telebirr Shop</h5>
            <p className="opacity-90">
              Experience the future of Ethiopian payments
            </p>
          </div>
          <div className="text-sm opacity-75">
            <p>
              &copy; 2025. developed by{" "}
              <a href="https://dev-abel.netlify.app/" target="_blank">
                Abel Hailemichael
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
