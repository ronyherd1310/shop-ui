// Hook-related type definitions
import { Order } from './order';
import { Product } from './product';

export interface UseProductsReturn {
  products: Product[];
  loading: boolean;
  error: string | null;
}

export interface UseMutateOrdersReturn {
  createOrder: (orderData: Order) => Promise<Order | null>;
  loading: boolean;
  error: string | null;
}

export interface UseOrdersReturn {
  orders: Order[];
  loading: boolean;
  error: string | null;
}
// You can add more hook-related types here in the future
// export interface UseCartReturn { ... }