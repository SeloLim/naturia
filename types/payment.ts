export interface PaymentMethod {
  id: number;
  name: string;
  code: string;
  description: string | null;
  is_active: boolean;
  display_order: number | null;
}