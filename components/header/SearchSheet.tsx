import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Search } from "lucide-react";
import Image from "next/image";
import { useProduct } from "@/hooks/useProduct";

const SearchSheet = () => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const {
      products,
      isLoading,
      isError,
    } = useProduct();

  // Fungsi pencarian
  const filteredProducts = products
    ? products.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <div>
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-md hover:bg-muted"
          >
            <Search size={20} />
            <span className="sr-only">Cari Produk</span>
          </Button>
        </SheetTrigger>
        <SheetContent className="w-full max-w-md mx-auto p-8">
          <SheetHeader className="text-center mb-6">
            <SheetTitle className="text-2xl font-bold">
              Search Products
            </SheetTitle>
            <SheetDescription className="text-muted-foreground">
              Uncover your glow: Discover skincare products tailored just for
              you.
            </SheetDescription>
          </SheetHeader>

          <div className="relative group mb-6">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
            />
            <Input
              placeholder="What are you looking for?"
              className="pl-12 pr-4 py-4 text-base rounded-md border focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-transparent transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Product Suggestions */}
          <div className="flex flex-col gap-4">
            {isLoading ? (
              <p className="text-center text-muted-foreground py-4">
                Loading products...
              </p>
            ) : isError ? (
              <p className="text-center text-muted-foreground py-4">
                Failed to load products.
              </p>
            ) : (
              <>
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center gap-4 cursor-pointer hover:bg-muted p-2 rounded-md transition"
                  >
                    <div className="w-12 h-12 bg-muted-foreground/10 rounded-md overflow-hidden relative">
                      {product.product_images[0]?.image_url ? (
                        <Image
                          src={product.product_images[0].image_url}
                          alt={product.name}
                          className="w-full h-full object-cover"
                          fill
                          sizes="48px"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200" />
                      )}
                    </div>
                    <div className="flex flex-col">
                      <p className="font-medium">{product.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {product.categories?.name}
                      </p>
                    </div>
                  </div>
                ))}

                {!isLoading && filteredProducts.length === 0 && (
                  <p className="text-center text-muted-foreground py-4">
                    No products found
                  </p>
                )}
              </>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default SearchSheet;