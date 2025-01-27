"use client";
import React, { createContext, useContext, useState, FC } from 'react';
import { CartItem } from '../interfaces/cart';
import { Product } from '../interfaces/product';

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  openCart: boolean;
  setOpenCart: (val: boolean) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: FC<React.PropsWithChildren<object>> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [openCart, setOpenCart] = useState<boolean>(false)

  const addToCart = (product: Product, quantity?: number) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
  
      // If the product already exists, increase its quantity
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
  
      // If the product doesn't exist, add it as a new item in the cart
      return [...prevCart, { ...product, quantity: quantity ?? 1 }];
    });
  };

  const removeFromCart = (id: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, openCart, setOpenCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
