"use client";
import { useState, useEffect } from "react";
import { httpService } from "../services/httpService";
import { useProductContext } from "@/context/ProductContext";

const useProducts = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { products, setProducts, allProduct, setAllProduct } = useProductContext();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsData = await httpService.get("/catalogs");
        setProducts(productsData);
        setAllProduct(productsData);
      } catch (err) {
        setError("Failed to fetch products");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filterProduct = async (type: string, value: string) => {
    if (type === "color") {
      const filteredProducts = allProduct.filter(
        (product) => product.variant.color.toLowerCase() === value.toLowerCase()
      );
      setProducts(filteredProducts);
    }
    if (type === "type") {
      const filteredProducts = allProduct.filter(
        (product) => product.variant.type.toLowerCase() === value.toLowerCase()
      );
      setProducts(filteredProducts);
    }
  };

  const totalProduct = (productType: string) => {
    if (allProduct.length > 0) {
      const totalProducts = allProduct.filter(
        (product) => product.variant.type === productType
      );
      return totalProducts.length;
    }
    return 0;
  };

  const getProductDetail = (productId: number) => {
    const prodDetail = allProduct.find((prod) => prod.id === productId)
    const variantId = prodDetail?.variant.id
    const allVariantData = allProduct.filter((prod) => prod.variant.id === variantId)
    const result = {
      id: prodDetail?.id,
      name: prodDetail?.name,
      type: prodDetail?.variant.type,
      variants: allVariantData.map((prod) => ({
        productId: prod.id,
        price: prod.price,
        color: prod.variant.color,
        imageUrl: prod.imageUrl,
      }))
    }
    return result;
  }

    const searchProducts = async (keyword: string) => {
      try {
        const endpoint = keyword ? `/catalogs?name=${keyword}` : '/catalogs';
        const productsData = await httpService.get(endpoint);
        setProducts(productsData);
        setAllProduct(productsData);
      } catch (err) {
        setError("Failed to fetch products");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

  return { products, loading, error, filterProduct, totalProduct, getProductDetail, searchProducts };
};

export default useProducts;
