// Hook-related type definitions
import { Product } from './product';

export interface UseProductsReturn {
  products: Product[];
  loading: boolean;
  error: string | null;
}

export interface UseMutateProductsReturn {
  createProduct: (product: Omit<Product, 'id' | 'discount'>) => Promise<Product | null>;
  loading: boolean;
  error: string | null;
}

// You can add more hook-related types here in the future
// export interface UseCartReturn { ... }