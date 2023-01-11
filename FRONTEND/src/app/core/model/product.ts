export class Product {
  id: number;
  name: string = '';
  description: string = '';
  price: number = 0;
  quantity: number = 0;
  constructor(name: string = '', description: string = '', price: number = 0,
    quantity: number = 0) {
    this.name = name;
    this.description = description;
    this.price = price;
    this.quantity = quantity;
  }
}
