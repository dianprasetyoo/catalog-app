"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";
import { Product } from "../interfaces/product";

interface ProductContextType {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  allProduct: Product[];
  setAllProduct: React.Dispatch<React.SetStateAction<Product[]>>;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

interface ProductProviderProps {
  children: ReactNode;
}

export const ProductProvider = ({ children }: ProductProviderProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [allProduct, setAllProduct] = useState<Product[]>([]);

  return (
    <ProductContext.Provider value={{ products, setProducts, allProduct, setAllProduct }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProductContext must be used within a ProductProvider");
  }
  return context;
};
