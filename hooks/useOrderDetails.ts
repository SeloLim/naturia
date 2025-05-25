import { useEffect, useState } from "react";
import { getOrderByNumber, OrderDetailsResponse } from "@/services/orderService";

export const useOrderDetails = (orderNumber: string | null) => {
  const [order, setOrder] = useState<OrderDetailsResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!orderNumber) {
      console.log('No order number provided');
      return;
    }

    const fetchOrder = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getOrderByNumber(orderNumber);
        console.log('Order fetched successfully:', data);
        setOrder(data);
      } catch (err) {
        console.error('Error fetching order:', err);
        setError(err instanceof Error ? err.message : 'Failed to load order');
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderNumber]);

  return { order, loading, error };
};