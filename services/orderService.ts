import { CartItem } from "@/types/checkout";

export interface PlaceOrderPayload {
  user_id: string;
  address: {
    recipient_name: string;
    phone_number: string;
    address_line1: string;
    address_line2?: string;
    city: string;
    province: string;
    postal_code: string;
    country: string;
  };
  payment_method_id: number;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
}

export interface OrderDetailsResponse {
  orderNumber: string;
  date: string;
  totalAmount: number;
  paymentMethod: string;
  items: {
    name: {
      name: string;
    };
    quantity: number;
    price: number;
    image: string;
  }[];
  shippingAddress: {
    name: string;
    address: string;
    city: string;
    postalCode: string;
    province: string;
    country: string;
  };
  estimatedDelivery: string;
}

export const getOrderByNumber = async (orderNumber: string): Promise<OrderDetailsResponse> => {
  console.log('Fetching order:', orderNumber);
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_ADMIN_API_URL}/api/orders/${orderNumber}`,
    { method: "GET", headers: { "Content-Type": "application/json" } }
  );
  
  if (!response.ok) {
    console.error('Error response:', response.status, response.statusText);
    throw new Error(`Failed to fetch order: ${response.status} ${response.statusText}`);
  }
  
  const data = await response.json();
  console.log('Order data received:', data);
  return data;
};

export const placeOrder = async (payload: PlaceOrderPayload) => {
  const response = await fetch(
    process.env.NEXT_PUBLIC_ADMIN_API_URL + "/api/orders",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }
  );
  if (!response.ok) {
    const errorDetail = await response.text();
    throw new Error(
      `Failed to place order: ${response.status} ${response.statusText} - ${errorDetail}`
    );
  }
  return response.json();
};