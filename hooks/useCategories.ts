import useSWR from 'swr';
import { fetchCategories } from '../services/categoryService';
import { Category } from '../types/category';

export const useCategory = () => {
  const { data, error } = useSWR<Category[]>('/api/categories', fetchCategories);

  return {
    categories: data,
    isLoading: !error && !data,
    isError: error,
  };
};
