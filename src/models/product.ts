export interface Product {
  name: string;
  image: string;
  _id: number;
  countInStock: number;
  price: string;
  rating: number;
  description: string;
}

export interface CartProduct extends Product {
  count : number ;
}