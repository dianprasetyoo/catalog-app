"use client";

import React from "react";
import useProducts from "../../../hooks/useProducts";
import ProductCard from "../../../components/ProductCard";
import { useCart } from "../../../context/CartContext";

const CatalogPage = () => {
  const { products, loading, error } = useProducts();
  const { addToCart } = useCart();

  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Product Catalog</h1>
      <div>
        <ProductCard
          products={products}
          onAddToCart={addToCart}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default CatalogPage;
