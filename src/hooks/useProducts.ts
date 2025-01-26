"use client";
import { useState, useEffect } from "react";
// import { httpService } from "../services/httpService";
import { Product } from "../interfaces/product";

const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const mockProductData: Product[] = [
    {
      id: 1,
      imageUrl: "https://www.atalon.id/cdn/shop/products/TshirttoBlack-5copy_eaba8905-1f4e-4f3e-94e8-647698f1f92e.jpg?v=1623039384&width=800",
      name: "Solid T-Shirt",
      price: 120,
      variant: {
        id: 1,
        color: 'black',
        type: 't-shirt'
      }
    },
    {
      id: 2,
      imageUrl: "https://www.atalon.id/cdn/shop/products/357.jpg?v=1621317514&width=800",
      name: "Solid T-Shirt",
      price: 110,
      variant: {
        id: 1,
        color: 'red',
        type: 't-shirt'
      }
    },
    {
      id: 3,
      imageUrl: "https://www.atalon.id/cdn/shop/products/373_c98121a9-9cd2-44f1-a5d1-2e046a024ac9.jpg?v=1621317520&width=800",
      name: "Solid T-Shirt",
      price: 130,
      variant: {
        id: 1,
        color: 'blue',
        type: 't-shirt'
      }
    },
    {
      id: 4,
      imageUrl: "https://www.atalon.id/cdn/shop/files/Running-TS-Catalog-1x1.jpg?v=1686031005&width=1000",
      name: "Running T-Shirt",
      price: 140,
      variant: {
        id: 2,
        color: 'black',
        type: 't-shirt'
      }
    },
    {
      id: 5,
      imageUrl: "https://www.atalon.id/cdn/shop/files/JDD00081navy.jpg?v=1704984390&width=1200",
      name: "Running T-Shirt",
      price: 135,
      variant: {
        id: 2,
        color: 'blue',
        type: 't-shirt'
      }
    },
    {
      id: 6,
      imageUrl: "https://www.atalon.id/cdn/shop/files/DEN00026.jpg?v=1725632465&width=1200",
      name: "Tech Cargo Jogger",
      price: 160,
      variant: {
        id: 3,
        color: 'black',
        type: 'pants'
      }
    },
    {
      id: 7,
      imageUrl: "https://www.atalon.id/cdn/shop/files/DEN00082.jpg?v=1725632554&width=1200",
      name: "Tech Cargo Jogger",
      price: 155,
      variant: {
        id: 3,
        color: 'blue',
        type: 'pants'
      }
    },
    {
      id: 8,
      imageUrl: "https://www.atalon.id/cdn/shop/files/SDIM0449.jpg?v=1707301894&width=1200",
      name: "Tech Cargo Jogger",
      price: 170,
      variant: {
        id: 3,
        color: 'black',
        type: 'pants'
      }
    },
    {
      id: 9,
      imageUrl: "https://www.atalon.id/cdn/shop/files/LIF_6008_a4fd20e8-5264-447a-b53c-77012c10b9f7.jpg?v=1700812125&width=1000",
      name: "Kinetic Dress Pants",
      price: 180,
      variant: {
        id: 4,
        color: 'black',
        type: 'pants'
      }
    },
    {
      id: 10,
      imageUrl: "https://www.atalon.id/cdn/shop/files/FPK202407221.jpg?v=1721898940&width=1200",
      name: "Running Belt",
      price: 80,
      variant: {
        id: 5,
        color: 'black',
        type: 'belt'
      }
    },
    {
      id: 11,
      imageUrl: "https://www.atalon.id/cdn/shop/files/FPK202407189.jpg?v=1721894802&width=1200",
      name: "Short Socks",
      price: 60,
      variant: {
        id: 6,
        color: 'black',
        type: 'socs'
      }
    },
    {
      id: 12,
      imageUrl: "https://www.atalon.id/cdn/shop/files/YKY_7158.jpg?v=1733457402&width=1200",
      name: "Long Sleeve",
      price: 125,
      variant: {
        id: 7,
        color: 'red',
        type: 't-shirt'
      }
    },
    {
      id: 13,
      imageUrl: "https://www.atalon.id/cdn/shop/files/YKY_7174.jpg?v=1733457404&width=1200",
      name: "Long Sleeve",
      price: 130,
      variant: {
        id: 7,
        color: 'blue',
        type: 't-shirt'
      }
    },
    {
      id: 14,
      imageUrl: "https://www.atalon.id/cdn/shop/files/CopyofDEN01344.jpg?v=1706019006&width=1200",
      name: "Move T-Shirt",
      price: 140,
      variant: {
        id: 8,
        color: 'red',
        type: 't-shirt'
      }
    },
    {
      id: 15,
      imageUrl: "https://www.atalon.id/cdn/shop/files/CopyofDEN01410.jpg?v=1706019006&width=1200",
      name: "Move T-Shirt",
      price: 125,
      variant: {
        id: 8,
        color: 'blue',
        type: 't-shirt'
      }
    },
    {
      id: 16,
      imageUrl: "https://www.atalon.id/cdn/shop/files/DEN01078.jpg?v=1730447689&width=1200",
      name: "Sculpt T-Shirt",
      price: 150,
      variant: {
        id: 9,
        color: 'yellow',
        type: 't-shirt'
      }
    },
    {
      id: 17,
      imageUrl: "https://www.atalon.id/cdn/shop/files/FPK2024071812.jpg?v=1721902528&width=1200",
      name: "Hip Resistance",
      price: 110,
      variant: {
        id: 10,
        color: 'black',
        type: 'belt'
      }
    },
    {
      id: 18,
      imageUrl: "https://www.atalon.id/cdn/shop/files/DEN00697.jpg?v=1730449042&width=1200",
      name: "Pulse T-Shirt",
      price: 115,
      variant: {
        id: 11,
        color: 'black',
        type: 't-shirt'
      }
    },
    {
      id: 19,
      imageUrl: "https://www.atalon.id/cdn/shop/files/DEN00747.jpg?v=1730448747&width=1200",
      name: "Pulse T-Shirt",
      price: 125,
      variant: {
        id: 11,
        color: 'yellow',
        type: 't-shirt'
      }
    },
    {
      id: 20,
      imageUrl: "https://www.atalon.id/cdn/shop/files/DEN00747.jpg?v=1730448747&width=1200",
      name: "Pulse T-Shirt",
      price: 120,
      variant: {
        id: 11,
        color: 'yellow',
        type: 't-shirt'
      }
    },
    {
      id: 21,
      imageUrl: "https://www.atalon.id/cdn/shop/files/DEN00615.jpg?v=1730449041&width=1200",
      name: "Pulse T-Shirt",
      price: 140,
      variant: {
        id: 11,
        color: 'blue',
        type: 't-shirt'
      }
    },
  ];
  

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // const productsData = await httpService.get("/products");
        setProducts(mockProductData);
      } catch (err) {
        setError("Failed to fetch products");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return { products, loading, error };
};

export default useProducts;
