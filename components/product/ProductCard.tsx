// Product Card Component
import Image from "next/image";

import { Heart } from "lucide-react";

import { Card, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";

import { Product } from "@/types/product";
import { formatCurrency } from "@/utils/formatCurrency";

import { Rating } from "./Rating";

export const ProductCard = ({
  product,
  onQuickView,
  showRating = false,
  showButton = true,
}: {
  product: Product;
  onQuickView?: (product: Product) => void;
  showRating?: boolean;
  showButton?: boolean;
}) => {
  const imageUrl =
    product.product_images.find((img) => img.is_primary)?.image_url ||
    "/api/placeholder/400/500";
  const isNew =
    new Date(product.created_at) >
    new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

  return (
    <Card className="overflow-hidden h-full flex flex-col bg-transparent shadow-none transition-all duration-300 border-0">
      <div className="relative w-full aspect-square rounded-lg overflow-hidden bg-gray-50">
        <Image
          src={imageUrl}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-300 hover:scale-105 cursor-pointer"
          sizes="(max-width: 768px) 100vw, 33vw"
          priority
        />

        {/* Top Right Icons */}
        <div className="absolute top-3 right-3 flex flex-col gap-2">
          <Button
            size="icon"
            variant="ghost"
            className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full shadow-sm hover:bg-white transition-all cursor-pointer"
          >
            <Heart size={16} className="text-gray-600" />
          </Button>

          {/* Stock Badges */}
          {product.stock === 0 ? (
            <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-red-600 shadow-sm">
              Sold Out
            </div>
          ) : product.stock < 10 ? (
            <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-amber-600 shadow-sm">
              Low Stock
            </div>
          ) : null}
        </div>

        {/* New Badge */}
        {isNew && (
          <div className="absolute top-3 left-3 bg-black/90 text-white px-3 py-1 rounded-full text-xs font-medium shadow-sm">
            New Arrival
          </div>
        )}
      </div>

      <div className="flex-1 flex flex-col justify-between">
        <CardHeader className="px-0 mb-8 cursor-pointer">
          <CardTitle className="text-base font-medium text-gray-900 text-center mb-1">
            {product.name}
          </CardTitle>
          {showRating && <Rating />}
          <span
            className={`text-sm font-medium text-center ${
              product.discountPrice ? "text-emerald-700" : "text-gray-900"
            }`}
          >
            {formatCurrency(product.discountPrice || product.price)}
          </span>
          {product.discountPrice && (
            <span className="text-sm text-gray-400 line-through text-center">
              {formatCurrency(product.price)}
            </span>
          )}
        </CardHeader>
        {showButton && (
          <CardFooter className="px-0 pb-0 flex flex-col items-center justify-between">
            <Button
              size="sm"
              variant="outline"
              className="text-white hover:bg-gray-900 hover:opacity-90 cursor-pointer bg-gray-900 hover:text-white h-10 w-32"
              onClick={() => onQuickView && onQuickView(product)}
              disabled={product.stock === 0}
            >
              Quick View
            </Button>
          </CardFooter>
        )}
      </div>
    </Card>
  );
};
