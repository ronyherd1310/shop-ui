'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { Order, UseOrdersReturn } from '../types';

export default function useOrders(tableNumber?: string): UseOrdersReturn {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        setError(null);

        const customer = tableNumber || '';
        console.log(customer);
        const response = await axios.get(`/api/orders?customer=${customer}`);
        setOrders(response.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch orders');
        console.error('Error fetching orders:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [tableNumber]);

  return { orders, loading, error };
}