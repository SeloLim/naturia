import { Category } from "./category";
import { SkinType } from "./skinType";

export interface ProductImage {
  id: number;
  image_url: string;
  is_primary: boolean;
  product_id: number;
}

export interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  benefits: string;
  key_ingredients: string;
  price: number;
  discountPrice?: number;
  volume_ml: number;
  category_id: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  stock: number;
  skin_type_id: number;
  how_to_use: string;
  product_images: ProductImage[];
  categories?: Category;
  skin_types?: SkinType;
}