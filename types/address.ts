export interface Address {
  id: string | number;
  user_id : string;
  label?: string;
  is_default: boolean;
  recipient_name: string;
  phone_number: string;
  address_line1: string;
  address_line2?: string;
  city: string;
  province: string;
  postal_code: string;
  country: string;
};