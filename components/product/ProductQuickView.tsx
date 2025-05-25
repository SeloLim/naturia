import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Product } from "@/types/product";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "../ui/button";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import { formatCurrency } from "@/utils/formatCurrency";
import { Rating } from "./Rating";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/hooks/useCart";

export const ProductQuickView = ({
  product,
  isOpen,
  onClose,
}: {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [quantity, setQuantity] = useState(1);
  const { user } = useAuth();

  const { addToCart, isError } = useCart(user?.id ? user.id : null);

  useEffect(() => {
    setQuantity(1);
  }, [product]);

  if (!user) return null;

  if (isError) {
    toast.error("Failed to add to cart");
  }

  if (!product) return null;

  const imageUrl =
    product.product_images.find((img) => img.is_primary)?.image_url ||
    "/api/placeholder/400/500";

  const increaseQuantity = () => {
    if (product && quantity < product.stock) {
      setQuantity((prev) => prev + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleAdd = async () => {
    try {
      await addToCart(product.id, quantity);
      toast.success("Added to cart");
      onClose();
    } catch {
      toast.error("Failed to add to cart");
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-md p-0 h-full overflow-hidden">
        <div className="relative w-full aspect-[16/9] bg-gray-100">
          <Image
            src={imageUrl}
            alt={product.name}
            fill
            className="object-contain object-center"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
          />
        </div>
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <SheetHeader className="space-y-2 -p-4">
            <div className="flex justify-between items-center">
              <SheetTitle className="text-2xl font-semibold text-gray-900">
                {product.name}
              </SheetTitle>
            </div>
            <SheetDescription className="text-sm text-gray-500">
              {product.categories?.name} • {product.volume_ml}ml
            </SheetDescription>
          </SheetHeader>

          <div className="space-y-4">
            <div>
              <Rating />
              <div className="mt-2 text-2xl font-bold text-emerald-600">
                {formatCurrency(product.price)}
              </div>
            </div>

            <div className="space-y-1">
              <h4 className="text-lg font-semibold text-gray-900">
                Description
              </h4>
              <p className="text-sm text-gray-600">{product.description}</p>
            </div>

            <div className="space-y-1">
              <h4 className="text-lg font-semibold text-gray-900">Benefits</h4>
              <p className="text-sm text-gray-600">{product.benefits}</p>
            </div>

            <div className="space-y-1">
              <h4 className="text-lg font-semibold text-gray-900">
                Key Ingredients
              </h4>
              <p className="text-sm text-gray-600">{product.key_ingredients}</p>
            </div>

            {product.how_to_use && (
              <div className="space-y-1">
                <h4 className="text-lg font-semibold text-gray-900">
                  How to Use
                </h4>
                <p className="text-sm text-gray-600">{product.how_to_use}</p>
              </div>
            )}

            <div className="space-y-1">
              <h4 className="text-lg font-semibold text-gray-900">
                Suitable For
              </h4>
              <p className="text-sm text-gray-600">
                {product.skin_types?.name} Skin
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-lg font-semibold text-gray-900">Quantity</h4>
            <div className="flex items-center gap-4">
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={decreaseQuantity}
                disabled={quantity <= 1}
                className="h-8 w-8"
              >
                <Minus size={16} />
              </Button>
              <span className="text-lg font-medium w-8 text-center">
                {quantity}
              </span>
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={increaseQuantity}
                disabled={quantity >= product.stock}
                className="h-8 w-8"
              >
                <Plus size={16} />
              </Button>
              <span className="text-sm text-gray-500">
                {product.stock} available
              </span>
            </div>
          </div>

          <Button
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium py-2 rounded-lg"
            onClick={handleAdd}
          >
            <ShoppingCart size={18} className="mr-2" />
            Add to Cart
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};
