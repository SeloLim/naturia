import { useState } from "react";
import { placeOrder, PlaceOrderPayload } from "@/services/orderService";

export const useOrder = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePlaceOrder = async (payload: PlaceOrderPayload) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await placeOrder(payload);
      return result;
    } catch (err) {
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { placeOrder: handlePlaceOrder, isLoading, error };
};