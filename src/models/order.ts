import { address } from "./address";
import { Product } from "./product";

export interface Order {
  shippingAddress: address;
  _id: string;
  orderItems: {
    product: Product;
    qty: number;
    _id: string;
  }[];
  paymentMethod: string;
  shippingPrice: string;
  totalPrice: number;
}
