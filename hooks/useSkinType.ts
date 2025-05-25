import useSWR from 'swr';
import { fetchSkinTypes } from '../services/skintypeService';
import { SkinType } from '../types/skinType';

export const useSkinType = () => {
  const { data, error } = useSWR<SkinType[]>('/api/skintypes', fetchSkinTypes);

  return {
    skintypes: data,
    isLoading: !error && !data,
    isError: error,
  };
};
