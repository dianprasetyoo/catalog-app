"use client"
import ProductCard from "../../../components/ProductCard";
import { useCart } from "../../../context/CartContext";
import useProducts from "../../../hooks/useProducts";

const CatalogDetailPage = () => {
  const { products, loading, error } = useProducts();
  const { addToCart } = useCart();

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="catalog-page">
      <h1>Catalog</h1>
      <div className="product-list">
        <ProductCard
          products={products}
          onAddToCart={addToCart}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default CatalogDetailPage;
