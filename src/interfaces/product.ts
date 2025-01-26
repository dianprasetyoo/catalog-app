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
