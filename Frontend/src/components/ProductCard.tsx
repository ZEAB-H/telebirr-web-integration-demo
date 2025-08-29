import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Loader2, ShoppingBag, Star } from 'lucide-react';
import headphonesImage from '@/assets/wireless-headphones.jpg';
import {
  priceList,
  createStartPayState,
  selectProduct,
  startPay,
  type StartPayState,
} from '@/hooks/startPay';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  rating: number;
}

const product: Product = {
  id: 'headphones-001',
  name: 'Premium Wireless Headphones',
  description: 'High-quality wireless headphones with noise cancellation, premium comfort, and crystal-clear sound quality.',
  price: 1000,
  image: headphonesImage,
  rating: 4.8
};

export const ProductCard = () => {
  const [payState, setPayState] = useState<StartPayState>(createStartPayState());
  const { toast } = useToast();

  // Find the index in priceList that matches the product price
  const productIndex = priceList.findIndex((p) => p === product.price);

  const handlePurchase = async () => {
    if (productIndex === -1) {
      toast({
        title: "Product Not Available",
        description: "This product is not available for purchase at the moment.",
        variant: "destructive",
      });
      return;
    }

    // Select the product in the pay state
    selectProduct(payState, setPayState, productIndex);

    // Start the payment process
    await startPay(
      { ...payState, selectedIndex: productIndex }, // ensure selectedIndex is set
      (newState) => {
        setPayState(newState);
        // Show error toast if any
        if (newState.error) {
          toast({
            title: "Payment Failed",
            description: newState.error,
            variant: "destructive",
          });
        }
        // Show loading toast if loading
        if (newState.loading) {
          toast({
            title: "Processing Payment",
            description: "Please wait while we initiate your payment...",
          });
        }
      }
    );
  };

  return (
    <Card className="w-full max-w-md mx-auto shadow-card hover:shadow-elegant transition-all duration-300 bg-gradient-card backdrop-blur-sm border border-border/50">
      <CardContent className="p-0">
        {/* Product Image */}
        <div className="relative overflow-hidden rounded-t-lg">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-4 right-4 bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-semibold">
            Sale
          </div>
        </div>

        {/* Product Details */}
        <div className="p-6 space-y-4">
          {/* Rating */}
          <div className="flex items-center space-x-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-secondary fill-secondary' : 'text-muted-foreground'}`}
              />
            ))}
            <span className="text-sm text-muted-foreground ml-2">({product.rating})</span>
          </div>

          {/* Product Name */}
          <h3 className="text-xl font-bold text-foreground leading-tight">
            {product.name}
          </h3>

          {/* Description */}
          <p className="text-muted-foreground text-sm leading-relaxed">
            {product.description}
          </p>

          {/* Price */}
          <div className="flex items-baseline space-x-2">
            <span className="text-3xl font-bold text-primary">
              {product.price.toLocaleString()} ETB
            </span>
            <span className="text-lg text-muted-foreground line-through">
              1,299 ETB
            </span>
          </div>

          {/* Purchase Button */}
          <Button
            onClick={handlePurchase}
            disabled={payState.loading}
            variant="telebirr"
            size="lg"
            className="w-full"
          >
            {payState.loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <ShoppingBag className="w-5 h-5" />
                Buy with Telebirr
              </>
            )}
          </Button>

          <p className="text-xs text-muted-foreground text-center">
            Secure payment powered by Telebirr
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
