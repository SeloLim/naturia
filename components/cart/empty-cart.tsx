import { ShoppingBag } from "lucide-react";
import { Button } from "../ui/button";

interface EmptyCartProps {
  onContinueShopping: () => void;
}

// 2. Gunakan tipe props sebagai anotasi parameter, hapus React.FC
const EmptyCart = ({ onContinueShopping }: EmptyCartProps) => {
  return (
    <div className="text-center py-12">
      <div className="flex justify-center mb-4">
        <ShoppingBag className="h-16 w-16 text-gray-300" />
      </div>
      <h2 className="text-xl font-medium mb-2">Your cart is empty</h2>
      <p className="text-gray-500 mb-6">
        Looks like you haven&apos;t added any products to your cart yet.
      </p>
      <Button onClick={onContinueShopping}>Continue Shopping</Button>
    </div>
  );
};

export { EmptyCart };