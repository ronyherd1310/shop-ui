'use client';

import { useState } from 'react';
import axios from 'axios';
import { Order, UseMutateOrdersReturn } from '../types';

export default function useMutateOrders(): UseMutateOrdersReturn {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const createOrder = async (orderData: Order): Promise<Order | null> => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.post('/api/orders', orderData);
      return response.data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create order');
      console.error('Error creating order:', err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { createOrder, loading, error };
}