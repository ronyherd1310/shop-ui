'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { Product, UseProductsReturn } from '../types';

export default function useProducts(): UseProductsReturn {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get('/api/products');
        console.log(response);
        const productsWithDiscount = response.data.map((product: Product) => ({
          ...product,
          discount: ((product.originalPrice - product.price)/product.originalPrice) * 100 || 0
        }));
        
        setProducts(productsWithDiscount);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch products');
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return { products, loading, error };
}