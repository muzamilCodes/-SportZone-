export interface User {
  _id: string;
  name: string;
  email: string;
  passwordHash: string;
  role: 'customer' | 'admin';
  createdAt: string;
}

export interface Product {
  _id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
  stock: number;
  rating?: number;
  featured?: boolean;
}

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

export interface ShippingAddress {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  zipCode: string;
}

export interface Order {
  _id: string;
  userId: string;
  items: OrderItem[];
  subtotal: number;
  shippingFee: number;
  tax: number;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  paymentMethod: 'cash_on_delivery' | 'stripe_card_test' | 'bank_transfer';
  paymentStatus: 'pending' | 'completed' | 'failed';
  shipping: ShippingAddress;
  createdAt: string;
}

export interface DatabaseSchema {
  users: User[];
  products: Product[];
  orders: Order[];
}
