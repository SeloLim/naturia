// components/cart/cart-item-card.tsx

import { Trash2 } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { QuantityControl } from "./quantity-control";
import { Button } from "../ui/button";
import Image from "next/image";
import { CartItem } from "@/types/cart"; // Menggunakan tipe CartItem yang baru
import { formatCurrency } from "@/utils/formatCurrency";

// Menggunakan tipe CartItem yang baru, jadi ID sekarang number
interface CartItemCardProps {
  item: CartItem;
  // Mengubah tipe id dari string menjadi number
  onUpdateQuantity: (id: number, newQuantity: number) => void;
  // Mengubah tipe id dari string menjadi number
  onRemove: (id: number) => void;
}

const CartItemCard = ({ item, onUpdateQuantity, onRemove }: CartItemCardProps) => {
  return (
    <Card className="mb-4">
      <CardContent className="p-4">
        <div className="flex gap-4">
          <div className="w-20 h-20 rounded-md overflow-hidden shrink-0 relative">
            <Image
              fill
              sizes="80px"
              src={item.image}
              alt={item.name}
              className="object-cover"
            />
          </div>
          <div className="flex-1">
            <div className="flex justify-between">
              <h3 className="font-medium">{item.name}</h3>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => onRemove(item.id)}
              >
                <Trash2 className="h-4 w-4 text-gray-500" />
              </Button>
            </div>
            <div className="flex justify-between items-center mt-4">
              <QuantityControl
                quantity={item.quantity}
                onIncrease={() => onUpdateQuantity(item.id, item.quantity + 1)}
                onDecrease={() => onUpdateQuantity(item.id, item.quantity - 1)}
              />
              <div className="font-medium">
                {formatCurrency(item.price * item.quantity)}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export { CartItemCard };