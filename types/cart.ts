type ProductDetails = {
  id: number; 
  name: string; 
  price: number; 
  image_url: string; 
};

type ApiCartItem = {
  id: number;
  quantity: number; 
  added_at: string;
  product_id: number; 
  products: ProductDetails; 
};

type CartItem = {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
};

export type { CartItem, ApiCartItem };