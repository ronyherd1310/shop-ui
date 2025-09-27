'use client';

import { useState } from 'react';
import axios from 'axios';

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  image: string;
  rating: number;
  reviews: number;
  description: string;
  discount: number;
}

interface UseMutateProductsReturn {
  createProduct: (product: Omit<Product, 'id' | 'discount'>) => Promise<Product | null>;
  loading: boolean;
  error: string | null;
}

export default function useMutateProducts(): UseMutateProductsReturn {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const createProduct = async (productData: Omit<Product, 'id' | 'discount'>): Promise<Product | null> => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.post('/api/products', productData);

      const newProduct: Product = {
        ...response.data,
        discount: ((productData.originalPrice - productData.price) / productData.originalPrice) * 100 || 0
      };

      return newProduct;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create product');
      console.error('Error creating product:', err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { createProduct, loading, error };
}