import { SkinType } from '../types/skintype';

const API_URL = process.env.NEXT_PUBLIC_ADMIN_API_URL + '/api/skin-types';

export const fetchSkinTypes = async (): Promise<SkinType[]> => {
  const response = await fetch(API_URL);
  const data = await response.json();
  return data;
};
