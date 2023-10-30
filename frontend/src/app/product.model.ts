export class Product {
  ID: number;

  name: string;
  description: string;
  price: number;
  
    constructor(id: number, name: string, description: string, price: number) {
      this.ID = id;

      this.name = name;
      this.description = description;
      this.price = price;
    }
  }
  