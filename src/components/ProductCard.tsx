import React from "react";
import { Product } from "../interfaces/product";
import Link from "next/link";

interface ProductCardProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  loading?: boolean;
}

const LoadingSkeleton = () => {
  return (
    <div className="animate-pulse bg-gray-300 rounded-lg overflow-hidden self-end">
      <div className="h-60"></div>
      <div className="p-4 mt-[-116px] bg-opacity-50 bg-gray-400 relative z-30">
        <div className="h-6 w-4/5 bg-gray-400 mb-2"></div>
        <div className="h-4 w-1/2 bg-gray-400"></div>
        <div className="h-4 w-3/4 bg-gray-400 mt-1"></div>
      </div>
    </div>
  );
};

const ProductCard = ({ products, onAddToCart, loading }: ProductCardProps) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {!products ||
        (loading &&
          [...Array(8)].map((_data, index) => <LoadingSkeleton key={index} />))}
      {products?.map((item, index) => (
        <div
          key={index}
          className="bg-gray-200 rounded-lg overflow-hidden cursor-pointer self-end"
        >
          <Link href={{ pathname: `/catalog/${item.id}` }} className="block">
            <div className="relative">
              <div className="text-white absolute bg-red-500 right-0 p-2 rounded-bl-md">
                $ {item.price}
              </div>
              <img
                src={item.imageUrl}
                alt={`Card ${index}`}
                className="w-full h-full object-contain"
              />
              <div className="p-4 mt-[-72px] bg-opacity-50 bg-black relative z-30">
                <h5 className="text-base font-bold text-white">{item.name}</h5>
                <p className="text-xs text-white line-clamp-3">
                  variant: {item.variant.color}
                </p>
              </div>
            </div>
          </Link>
          <div
            className="flex justify-center bg-red-500 py-3 text-white cursor-pointer z-30"
            onClick={() => onAddToCart(item)}
          >
            Add to Cart
          </div>
        </div>
      ))}
    </div>
    // <div>
    //   <img src={product.imageUrl} alt={product.name} />
    //   <h2>{product.name}</h2>
    //   <p>{product.description}</p>
    //   <p>${product.price}</p>
    //   <button onClick={() => onAddToCart(product)}>Add to Cart</button>
    // </div>
  );
};

export default ProductCard;
