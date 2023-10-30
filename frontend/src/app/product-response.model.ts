export interface ProductResponse {
    data: Product;
    status: number; 
  }

  
  export interface Product {
    ID: number
    name: string;
    description: string;
    price: number;
  }
  