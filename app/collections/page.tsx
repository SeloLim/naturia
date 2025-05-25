"use client";

import { useState, useEffect } from "react";
import { Filter, ShoppingBag, Leaf, Droplet, BadgeCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useProduct } from "@/hooks/useProduct";
import { useCategory } from "@/hooks/useCategories";
import { Product } from "@/types/product";
import { ProductCard } from "@/components/product/ProductCard";

// Main component
export default function CollectionsPage() {
  const {
    products,
    isLoading: isProductsLoading,
  } = useProduct();
  const {
    categories,
  } = useCategory();

  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [availability, setAvailability] = useState<string>("all");

  // Apply filters
  useEffect(() => {
    let filtered = [...(products ?? [])];

    // Apply category filter
    if (selectedCategory !== "all") {
      const categoryId = Number(selectedCategory);
      filtered = filtered.filter(
        (product) => product.category_id === categoryId
      );
    }

    // Apply availability filter
    if (availability === "in-stock") {
      filtered = filtered.filter((product) => product.stock > 0);
    } else if (availability === "out-of-stock") {
      filtered = filtered.filter((product) => product.stock === 0);
    }

    setFilteredProducts(filtered);
  }, [selectedCategory, availability, products]);

  return (
    <div className="bg-green-50/30 min-h-screen pt-40">
      {/* Hero Banner */}
      <div className="relative bg-gradient-to-r from-green-100 to-teal-50 py-12 px-4 sm:px-6 lg:px-8 rounded-b-lg overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(#84cc16_1px,transparent_1px)] [background-size:20px_20px]"></div>
        </div>
        <div className="relative max-w-5xl mx-auto text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-green-800 sm:text-5xl md:text-6xl">
            Our Collections
          </h1>
          <p className="mt-3 max-w-md mx-auto text-lg text-green-700 sm:text-xl md:max-w-3xl">
            Discover our natural skincare products made with botanical
            ingredients
          </p>
          <div className="mt-6 flex justify-center space-x-3">
            <Badge
              variant="outline"
              className="px-4 py-1 border-green-300 bg-white/70 text-green-800 flex items-center gap-1"
            >
              <Leaf size={14} className="text-green-600" />
              Natural
            </Badge>
            <Badge
              variant="outline"
              className="px-4 py-1 border-green-300 bg-white/70 text-green-800 flex items-center gap-1"
            >
              <Droplet size={14} className="text-blue-500" />
              Gentle
            </Badge>
            <Badge
              variant="outline"
              className="px-4 py-1 border-green-300 bg-white/70 text-green-800 flex items-center gap-1"
            >
              <BadgeCheck size={14} className="text-green-600" />
              Eco-friendly
            </Badge>
          </div>
        </div>
      </div>

      {/* Filter and Products */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
          <h2 className="text-2xl font-semibold text-green-900 flex items-center gap-2">
            <ShoppingBag size={24} className="text-green-700" />
            Skincare Products
            <span className="text-green-600 text-lg font-normal">
              ({filteredProducts.length})
            </span>
          </h2>

          {/* Mobile Filter Button */}
          <div className="block sm:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  className="flex items-center gap-2 bg-white"
                >
                  <Filter size={16} />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Filter Products</SheetTitle>
                </SheetHeader>
                <div className="py-4 space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-1 block">
                      Category
                    </label>
                    <Select
                      value={selectedCategory}
                      onValueChange={setSelectedCategory}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="All Categories" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        {categories?.map((category) => (
                          <SelectItem
                            key={category.id}
                            value={category.id.toString()}
                          >
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">
                      Availability
                    </label>
                    <Select
                      value={availability}
                      onValueChange={setAvailability}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="All Products" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Products</SelectItem>
                        <SelectItem value="in-stock">In Stock</SelectItem>
                        <SelectItem value="out-of-stock">
                          Out of Stock
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Desktop Filters */}
          <div className="hidden sm:flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-green-700 font-medium">
                Category:
              </span>
              <Select
                value={selectedCategory}
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger className="w-48 bg-white">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories?.map((category) => (
                    <SelectItem
                      key={category.id}
                      value={category.id.toString()}
                    >
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm text-green-700 font-medium">
                Availability:
              </span>
              <Select value={availability} onValueChange={setAvailability}>
                <SelectTrigger className="w-48 bg-white">
                  <SelectValue placeholder="All Products" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Products</SelectItem>
                  <SelectItem value="in-stock">In Stock</SelectItem>
                  <SelectItem value="out-of-stock">Out of Stock</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {isProductsLoading ? (
          <div className="text-center py-16">
            <div className="mx-auto h-12 w-12 border-4 border-green-200 border-t-green-600 rounded-full animate-spin"></div>
            <h3 className="mt-4 text-sm font-medium text-gray-900">
              Loading products...
            </h3>
          </div>
        ) : (
          <>
            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  showButton={false}
                />
              ))}
            </div>

            {/* Empty State */}
            {!isProductsLoading && filteredProducts.length === 0 && (
              <div className="text-center py-16">
                <ShoppingBag className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-semibold text-gray-900">
                  No products found
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Try changing your filters or check back later.
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
