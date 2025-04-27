// hooks/useCart.ts
import { useState, useEffect } from 'react';

interface CartItem {
  ticketId: number;
  quantity: number;
}

export const useCart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const response = await fetch('/api/panier/tickets');
      const data = await response.json();
      setCartItems(data);
    } catch (error) {
      console.error('Erreur lors du chargement du panier');
    } finally {
      setIsLoading(false);
    }
  };

  return { cartItems, isLoading, refetch: fetchCart };
};