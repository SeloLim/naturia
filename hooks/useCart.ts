import useSWR from "swr";
import { fetchCart, addToCart, updateCartItem, removeCartItem } from "@/services/cartService";
import { CartItem, ApiCartItem } from "@/types/cart";

export const useCart = (userId: string | null) => {
  const { data, error, isLoading, mutate } = useSWR(
    userId ? ["cart", userId] : null,
    () => fetchCart(userId!),
    {
      shouldRetryOnError: (err) => {
        // Jangan retry kalau error 404
        return !(err?.message?.includes("404"));
      },
      // Atau bisa juga disable retry sama sekali:
      // shouldRetryOnError: false,
    }
  );

  const cartItems: CartItem[] =
    data?.items?.map((item: ApiCartItem) => ({
      id: item.product_id,
      name: item.products.name,
      price: item.products.price,
      image: item.products.image_url,
      quantity: item.quantity,
    })) ?? [];

  // Tambah ke cart, lalu mutate agar data terupdate
  const handleAddToCart = async (
    product_id: number,
    quantity: number
  ) => {
    if (!userId) throw new Error("User not logged in");
    await addToCart({ user_id: userId, product_id, quantity });
    mutate(); // refresh cart
  };

  const handleUpdateQuantity = async (
    product_id: number,
    quantity: number
  ) => {
    if (!userId) throw new Error("User not logged in");
    await updateCartItem({ user_id: userId, product_id, quantity });
    mutate();
  };

  const handleRemoveItem = async (product_id: number) => {
    if (!userId) throw new Error("User not logged in");
    await removeCartItem({ user_id: userId, product_id});
    mutate();
  };

  return {
    cartItems,
    isLoading,
    isError: error,
    mutate,
    addToCart: handleAddToCart,
    updateQuantity: handleUpdateQuantity,
    removeItem: handleRemoveItem,
  };
};