"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { CartItem } from "@/types/checkout";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatCurrency } from "@/utils/formatCurrency";

interface OrderSummaryProps {
  items: CartItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  isLoading: boolean;
  isFormValid: boolean;
  onPlaceOrder: () => void;
}

export const OrderSummary = ({
  items,
  subtotal,
  shipping,
  tax,
  total,
  isLoading,
  isFormValid,
  onPlaceOrder,
}: OrderSummaryProps) => {
  return (
    <Card className="sticky top-20">
      <CardContent className="pt-6">
        <h2 className="text-xl font-medium mb-4">Order Summary</h2>
        
        <ScrollArea className="h-48 mb-4">
          <div className="space-y-3">
            {items.map((item) => (
              <div key={item.id} className="flex justify-between text-sm">
                <div className="flex-1">
                  <p className="font-medium">{item.name}</p>
                  {item.variant && <p className="text-gray-500">{item.variant}</p>}
                  <p className="text-gray-500">Qty: {item.quantity}</p>
                </div>
                <p className="font-medium">{formatCurrency(item.price * item.quantity)}</p>
              </div>
            ))}
          </div>
        </ScrollArea>
        
        <Separator className="my-4" />
        
        <div className="space-y-2">
          <div className="flex justify-between">
            <p className="text-gray-600">Subtotal</p>
            <p>{formatCurrency(subtotal)}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-600">Shipping</p>
            <p>{formatCurrency(shipping)}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-600">Tax</p>
            <p>{formatCurrency(tax)}</p>
          </div>
          <Separator className="my-2" />
          <div className="flex justify-between font-medium">
            <p>Total</p>
            <p className="text-lg">{formatCurrency(total)}</p>
          </div>
        </div>
      </CardContent>
      
      <CardFooter>
        <Button 
          className="w-full py-6"
          onClick={onPlaceOrder}
          disabled={!isFormValid || isLoading}
        >
          {isLoading ? "Processing..." : "Place Order"}
        </Button>
      </CardFooter>
    </Card>
  );
};