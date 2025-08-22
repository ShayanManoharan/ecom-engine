import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Cart, CartItem } from '../types';
import { apiService } from '../services/api';

interface CartContextType {
  cart: Cart | null;
  loading: boolean;
  createCart: () => Promise<void>;
  addItem: (variantId: string, qty: number) => Promise<void>;
  updateItem: (variantId: string, qty: number) => Promise<void>;
  removeItem: (variantId: string) => Promise<void>;
  clearCart: () => void;
  itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(false);

  const createCart = async () => {
    setLoading(true);
    try {
      const cartData = await apiService.createCart();
      setCart(cartData);
      localStorage.setItem('cartId', cartData.id);
    } catch (error) {
      console.error('Failed to create cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const addItem = async (variantId: string, qty: number) => {
    if (!cart) {
      await createCart();
      return;
    }

    setLoading(true);
    try {
      await apiService.addCartItem(cart.id, { variantId, qty });
      const updatedCart = await apiService.getCart(cart.id);
      setCart(updatedCart);
    } catch (error) {
      console.error('Failed to add item to cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateItem = async (variantId: string, qty: number) => {
    if (!cart) return;

    setLoading(true);
    try {
      await apiService.updateCartItem(cart.id, variantId, qty);
      const updatedCart = await apiService.getCart(cart.id);
      setCart(updatedCart);
    } catch (error) {
      console.error('Failed to update cart item:', error);
    } finally {
      setLoading(false);
    }
  };

  const removeItem = async (variantId: string) => {
    if (!cart) return;

    setLoading(true);
    try {
      await apiService.removeCartItem(cart.id, variantId);
      const updatedCart = await apiService.getCart(cart.id);
      setCart(updatedCart);
    } catch (error) {
      console.error('Failed to remove cart item:', error);
    } finally {
      setLoading(false);
    }
  };

  const clearCart = () => {
    setCart(null);
    localStorage.removeItem('cartId');
  };

  useEffect(() => {
    const cartId = localStorage.getItem('cartId');
    if (cartId) {
      apiService.getCart(cartId)
        .then(cartData => {
          setCart(cartData);
        })
        .catch(() => {
          localStorage.removeItem('cartId');
        });
    }
  }, []);

  const value: CartContextType = {
    cart,
    loading,
    createCart,
    addItem,
    updateItem,
    removeItem,
    clearCart,
    itemCount: cart?.itemCount || 0,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
