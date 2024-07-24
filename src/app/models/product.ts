export interface Product {
    id: number;
    name: string;
    description: string;
    imagePath: string;
    variances: ProductVariance[];
  }
  
  export interface ProductVariance {
    info: string;
    price: number;
  }