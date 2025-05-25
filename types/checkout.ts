// Address type definition
export interface Address {
  id: string;
  name: string;
  recipient: string;
  street: string;
  city: string;
  province: string;
  postalCode: string;
  phone: string;
  isDefault?: boolean;
}

// Payment method type definition
export type PaymentMethodType = 'creditCard' | 'bankTransfer' | 'eWallet' | 'cod';

export interface PaymentMethod {
  id: string;
  type: PaymentMethodType;
  name: string;
  icon: string; // Lucide icon name
  details: string;
}

// Cart item type (if not already defined elsewhere)
export interface CartItem {
  id: number;
  productId: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  variant?: string;
}

// Order type
export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  addressId: string;
  paymentMethodId: string;
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string;
}