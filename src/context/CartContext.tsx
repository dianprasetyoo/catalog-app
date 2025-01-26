"use client";
import React, { createContext, useContext, useState, FC } from 'react';
import { CartItem } from '../interfaces/cart';
import { Product } from '../interfaces/product';

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: FC<React.PropsWithChildren<object>> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  console.log('test:', cart)

  const addToCart = (product: Product) => {
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
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  return (
    <CartContext.Provider value={{ cart, addToCart }}>
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
