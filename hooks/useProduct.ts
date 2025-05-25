import useSWR from 'swr';
import { fetchProducts } from '../services/productService';
import { Product } from '../types/product';

export const useProduct = () => {
  const { data, error } = useSWR<Product[]>('/api/products', fetchProducts);

  return {
    products: data,
    isLoading: !error && !data,
    isError: error,
  };
};
