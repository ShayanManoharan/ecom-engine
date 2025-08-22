export interface User {
  id: string;
  email: string;
  role: 'ADMIN' | 'CUSTOMER';
  createdAt: string;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  category: string;
  images: string[];
  createdAt: string;
  updatedAt: string;
  variants: ProductVariant[];
  minPrice: number;
  maxPrice: number;
  totalVariants: number;
}

export interface ProductVariant {
  id: string;
  sku: string;
  attributes: Record<string, string>;
  price: number;
  inventoryQty: number;
  active: boolean;
}

export interface CartItem {
  id: string;
  variantId: string;
  sku: string;
  productTitle: string;
  attributes: Record<string, string>;
  qty: number;
  unitPrice: number;
  totalPrice: number;
}

export interface Cart {
  id: string;
  userId?: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  total: number;
  createdAt: string;
  updatedAt: string;
  itemCount: number;
}

export interface Order {
  id: string;
  userId: string;
  totalCents: number;
  currency: string;
  status: 'CREATED' | 'PAID' | 'SHIPPED' | 'DELIVERED' | 'REFUNDED' | 'CANCELLED';
  paymentIntentId?: string;
  shippingAddress: Record<string, string>;
  createdAt: string;
  items: OrderItem[];
}

export interface OrderItem {
  id: string;
  variantId: string;
  qty: number;
  unitPriceCents: number;
}

export interface AuthRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  id: string;
  email: string;
  role: 'ADMIN' | 'CUSTOMER';
  token: string;
}

export interface CheckoutSessionRequest {
  cartId: string;
  currency: string;
  shippingAddress: Record<string, string>;
}

export interface CheckoutSessionResponse {
  cartId: string;
  paymentIntentId: string;
  clientSecret: string;
  amount: number;
  currency: string;
}
