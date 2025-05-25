import { Category } from '../types/category';

const API_URL = process.env.NEXT_PUBLIC_ADMIN_API_URL + '/api/categories';

export const fetchCategories = async (): Promise<Category[]> => {
  const response = await fetch(API_URL);
  const data = await response.json();
  return data;
};
