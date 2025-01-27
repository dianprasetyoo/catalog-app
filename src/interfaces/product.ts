export interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  variant: VarianProduct
}

interface VarianProduct {
    id: number,
    color: "black" | "yellow" | "red" | "blue",
    type: "t-shirt" | "pants" | "socs" | "belt"
}

export interface ProductDetail {
  id?: number;
  name?: string;
  type?: string;
  variants?: VariantDetail[];
}

interface VariantDetail {
  productId: number
  color: "black" | "yellow" | "red" | "blue";
  imageUrl: string;
  price?: number;
}
