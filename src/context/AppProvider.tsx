import React, { ReactNode } from "react";
import { ProductProvider } from "./ProductContext";
import { CartProvider } from "./CartContext";

const providers = [ ProductProvider, CartProvider];

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => {
  return providers.reduce(
    (acc, Provider) => <Provider>{acc}</Provider>,
    children
  );
};
