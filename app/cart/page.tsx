"use client";

import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useRouter } from "next/navigation";
import { CartItemCard } from "@/components/cart/cart-item-card";
import { CartSummary } from "@/components/cart/cart-summary";
import { EmptyCart } from "@/components/cart/empty-cart";
import { useCart } from "@/hooks/useCart";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

const CartPage = () => {
  const { user } = useAuth();
  const router = useRouter();

  const { cartItems, isLoading, isError, updateQuantity, removeItem } = useCart(user?.id ?? "");
  const [error] = useState<string | null>(null);

  const handleUpdateQuantity = (productId: number, newQuantity: number) => {
    updateQuantity(productId, newQuantity);
    
  };
  
  const handleRemoveItem = (productId: number) => {
    removeItem(productId);
  };

  const continueShopping = () => {
    router.push("/collections");
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = cartItems.length > 0 ? 10000 : 0; // Biaya kirim statis
  const tax = subtotal * 0.08; // Pajak statis 8%
  const total = subtotal + shipping + tax;

  // Tampilan komponen
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 pt-40">
      <div className="mb-8">
        <Button
          variant="ghost"
          className="flex items-center text-gray-600"
          onClick={continueShopping}
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Continue Shopping
        </Button>
      </div>

      <h1 className="text-3xl font-semibold mb-8">Your Cart</h1>

      {isLoading ? (
        <div className="text-center text-lg">Loading cart...</div>
      ) : isError ? (
        <div className="text-center text-red-500 text-lg">
          {error || "Failed to load cart"}
        </div>
      ) : cartItems.length > 0 ? (
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            {/* Perbaiki tinggi ScrollArea jika perlu, sesuaikan dengan layout */}
            <ScrollArea className="h-[calc(100vh-300px)] md:h-[calc(100vh-400px)]">
              <div className="pr-4 space-y-4">
                {" "}
                {cartItems.map((item) => (
                  <CartItemCard
                    key={item.id}
                    item={item}
                    onUpdateQuantity={handleUpdateQuantity}
                    onRemove={handleRemoveItem}
                  />
                ))}
              </div>
            </ScrollArea>
          </div>

          <div>
            <CartSummary
              subtotal={subtotal}
              shipping={shipping}
              tax={tax}
              total={total}
              // TODO: Format mata uang di sini atau di komponen CartSummary
            />
          </div>
        </div>
      ) : (
        <EmptyCart onContinueShopping={continueShopping} />
      )}
    </div>
  );
};

export default CartPage;
