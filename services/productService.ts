import { Product } from '../types/product';

const API_URL = process.env.NEXT_PUBLIC_ADMIN_API_URL + '/api/products';

export const fetchProducts = async (): Promise<Product[]> => {
  const response = await fetch(API_URL);
  const data = await response.json();
  return data;
};
