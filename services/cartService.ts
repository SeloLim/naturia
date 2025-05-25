import { ApiCartItem } from "@/types/cart";

const API_URL = process.env.NEXT_PUBLIC_ADMIN_API_URL + "/api/cart";

export const fetchCart = async (userId: string) => {
  if (!userId) throw new Error("User ID is not available.");

  const response = await fetch(`${API_URL}?user_id=${userId}`);

  if (response.status === 404) {
    // Cart belum ada, anggap cart kosong
    return { cart_id: null, items: [] };
  }

  if (!response.ok) {
    const errorDetail = await response.text();
    throw new Error(
      `Failed to fetch cart: ${response.status} ${response.statusText} - ${errorDetail}`
    );
  }

  const data: { cart_id: number; items: ApiCartItem[] } = await response.json();
  return data;
};

export const addToCart = async ({
  user_id,
  product_id,
  quantity,
}: {
  user_id: string;
  product_id: number;
  quantity: number;
}) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user_id, product_id, quantity }),
  });

  if (!response.ok) {
    const errorDetail = await response.text();
    throw new Error(
      `Failed to add to cart: ${response.status} ${response.statusText} - ${errorDetail}`
    );
  }

  return response.json();
};

export const updateCartItem = async ({
  user_id,
  product_id,
  quantity,
}: {
  user_id: string;
  product_id: number;
  quantity: number;
}) => {
  const response = await fetch(API_URL, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user_id, product_id, quantity }),
  });

  if (!response.ok) {
    const errorDetail = await response.text();
    throw new Error(
      `Failed to update cart item: ${response.status} ${response.statusText} - ${errorDetail}`
    );
  }

  return response.json();
};

export const removeCartItem = async ({
  user_id,
  product_id,
}: {
  user_id: string;
  product_id: number;
}) => {
  const response = await fetch(API_URL, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user_id, product_id }),
  });

  if (!response.ok) {
    const errorDetail = await response.text();
    throw new Error(
      `Failed to remove cart item: ${response.status} ${response.statusText} - ${errorDetail}`
    );
  }

  return response.json();
};