"use client"
import React, { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";
import useProducts from "@/hooks/useProducts";
import { useParams } from 'next/navigation'
import ImageSlider from "@/components/ImageSlider";
import { ProductDetail } from "@/interfaces/product";
import { FaShoppingCart } from "react-icons/fa";
import { toast } from 'react-toastify';

const CatalogDetailPage = () => {
  const { products, error, getProductDetail } = useProducts();
  const { addToCart } = useCart();
  const params = useParams()
  const [productDetail, setProductDetail] = useState<ProductDetail | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<number>(0)
  const selectedProduct = productDetail?.variants ? productDetail?.variants[selectedVariant] : null
  const [quantity, setQuantity] = useState<number>(1)

  const images = productDetail?.variants?.map((data) => data.imageUrl) || [];

  useEffect(() => {
    if (params.productId) {
      const detailProduct = getProductDetail(Number(params.productId));
      setProductDetail(detailProduct);
    }
  }, [params.productId]);

  if (error) {
    return <div>{error}</div>;
  }

  const handleAddToCart = () => {
    const addProduct = products.filter((item) => item.id === selectedProduct?.productId)
    addToCart(addProduct[0], quantity)

    toast.success("Item added to cart!", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      draggable: true,
      progress: undefined,
    });
  }

  return (
    <div className="max-w-screen-xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Card Left */}
        <ImageSlider images={images} onImageChange={(data) => setSelectedVariant(data - 1)} />

        {/* Card Right */}
        <div className="p-6">
          <h2 className="text-3xl font-semibold mb-2 text-gray-900">{productDetail?.name}</h2>
          <div className="mb-4">
            <p className="text-xl font-semibold text-red-500">
              Price: <span className="text-red-500">${productDetail?.variants ? productDetail?.variants[selectedVariant]?.price : 0}</span>
            </p>
          </div>
          <div className="mb-6">
            <h2 className="text-lg text-gray-900 mb-2">About this item:</h2>
            <p className="text-sm text-gray-700 mb-2">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo eveniet veniam tempora fuga
              tenetur placeat sapiente architecto illum soluta consequuntur, aspernatur quidem at sequi
              ipsa!
            </p>
            <p className="text-sm text-gray-700 mb-2">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur, perferendis eius.
            </p>
            <ul className="list-none text-sm text-gray-700">
              <li>Variant: <span className="font-medium">{productDetail?.variants ? productDetail?.variants[selectedVariant]?.color : '-'}</span></li>
              <li>Category: <span className="font-medium">{productDetail ? productDetail?.type : '-'}</span></li>
            </ul>
          </div>
          <div className="flex items-center space-x-4">
            <input
              type="number"
              min="1"
              value={`${quantity}`}
              className="border border-gray-300 rounded-full px-4 py-2 w-16 text-center"
              onChange={(e) => setQuantity(Number(e.target.value))}
            />
            <button className="bg-red-500 text-white py-2 px-4 flex items-center border-node" onClick={() => handleAddToCart()}>
              <FaShoppingCart className="mr-2"/> Add To Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CatalogDetailPage;
