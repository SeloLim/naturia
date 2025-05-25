"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import BannerCarousel from "@/components/home/banner";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Product } from "@/types/product";
import { ProductCard } from "@/components/product/ProductCard";
import { ProductQuickView } from "@/components/product/ProductQuickView";
import { useProduct } from "@/hooks/useProduct";

// Main homepage component
const HomePage = () => {
  const { products, isLoading: isProductsLoading } = useProduct();
  const [categories, setCategories] = useState<{ [key: string]: Product[] }>(
    {}
  );
  const [newArrivals, setNewArrivals] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>("");

  useEffect(() => {
    // Proses data hanya jika products sudah ada, bukan null/undefined, dan merupakan array
    if (products && Array.isArray(products) && products.length > 0) {
      // Get new arrivals (most recent created_at)
      const sortedByDate = [...products].sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
      setNewArrivals(sortedByDate.slice(0, 4));

      // Group products by category
      const productsByCategory: { [key: string]: Product[] } = {};
      products.forEach((product) => {
        // Pastikan product.categories dan product.categories.name ada
        const categoryName = product.categories?.name;
        if (categoryName) {
          if (!productsByCategory[categoryName]) {
            productsByCategory[categoryName] = [];
          }
          productsByCategory[categoryName].push(product);
        }
      });
      setCategories(productsByCategory);

      // Set active category to first category
      const categoryKeys = Object.keys(productsByCategory);
      if (categoryKeys.length > 0) {
        setActiveCategory(categoryKeys[0]);
      } else {
        setActiveCategory(""); // Tidak ada kategori, set ke string kosong
      }
    } else if (!isProductsLoading) {
      // Jika selesai loading dan tidak ada produk, reset state
      setNewArrivals([]);
      setCategories({});
      setActiveCategory("");
    }
  }, [products, isProductsLoading]);

  const handleQuickView = (product: Product) => {
    setSelectedProduct(product);
    setIsQuickViewOpen(true);
  };

  const closeQuickView = () => {
    setIsQuickViewOpen(false);
  };

  return (
    <div className="flex flex-col min-h-screen pt-24">
      <main className="flex-grow">
        <div className="py-12">
          <BannerCarousel />
        </div>

        {/* Features */}
        <section className="py-10 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg text-center shadow-sm">
                <div className="rounded-full bg-emerald-100 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-emerald-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">
                  100% Natural Ingredients
                </h3>
                <p className="text-gray-600">
                  All our products are made with carefully selected natural
                  ingredients
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg text-center shadow-sm">
                <div className="rounded-full bg-emerald-100 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-emerald-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">Cruelty Free</h3>
                <p className="text-gray-600">
                  We never test on animals and support ethical beauty practices
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg text-center shadow-sm">
                <div className="rounded-full bg-emerald-100 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-emerald-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">
                  Dermatologist Approved
                </h3>
                <p className="text-gray-600">
                  All products are tested and approved by certified
                  dermatologists
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* New Arrivals */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold">New Arrivals</h2>
              <Button
                variant="ghost"
                className="text-emerald-600 hover:text-emerald-700"
              >
                View All <ChevronRight size={16} className="ml-1" />
              </Button>
            </div>

            {isProductsLoading ? (
              <div className="text-center py-10">Loading new arrivals...</div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {newArrivals.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onQuickView={handleQuickView}
                  />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Category Products with Tabs */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold">Shop by Category</h2>
              <Button
                variant="ghost"
                className="text-emerald-600 hover:text-emerald-700"
              >
                View All Categories <ChevronRight size={16} className="ml-1" />
              </Button>
            </div>

            {isProductsLoading ? (
              <div className="text-center py-10">Loading categories...</div>
            ) : (
              <Tabs
                defaultValue={activeCategory}
                value={activeCategory}
                onValueChange={setActiveCategory}
              >
                <TabsList className="mb-6 flex flex-wrap justify-start w-full bg-transparent">
                  {Object.keys(categories).map((category) => (
                    <TabsTrigger
                      key={category}
                      value={category}
                      className="
                        px-4 py-2 mx-1
                        bg-transparent           
                        hover:bg-transparent
                        hover:border-0
                        hover:border-b-1
                        hover:border-black
                        shadow-none              
                        data-[state=active]:bg-transparent 
                        data-[state=active]:shadow-none
                        data-[state=active]:border-0  
                        data-[state=active]:border-b-2
                        rounded-none
                        data-[state=active]:border-black
                        data-[state=active]:font-semibold  
                        focus-visible:ring-0
                        focus-visible:ring-offset-0
                        h-14
                      "
                    >
                      {category}
                    </TabsTrigger>
                  ))}
                </TabsList>

                {Object.entries(categories).map(
                  ([category, categoryProducts]) => (
                    <TabsContent key={category} value={category}>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {categoryProducts.slice(0, 4).map((product) => (
                          <ProductCard
                            key={product.id}
                            product={product}
                            onQuickView={handleQuickView}
                          />
                        ))}
                      </div>

                      {categoryProducts.length > 4 && (
                        <div className="text-center mt-8">
                          <Button
                            variant="outline"
                            className="border-emerald-600 text-emerald-600 hover:bg-emerald-50"
                          >
                            View More {category} Products
                          </Button>
                        </div>
                      )}
                    </TabsContent>
                  )
                )}
              </Tabs>
            )}
          </div>
        </section>
      </main>

      {/* Product Quick View Sheet */}
      <ProductQuickView
        product={selectedProduct}
        isOpen={isQuickViewOpen}
        onClose={closeQuickView}
      />
    </div>
  );
};

export default HomePage;
