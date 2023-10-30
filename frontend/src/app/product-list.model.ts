

  export interface ProductList {
    data: Product[];
    status: number;
  }
  
  export interface Product {
    ID: number;
    name: string;
    description: string;
    price: number;
  }
  