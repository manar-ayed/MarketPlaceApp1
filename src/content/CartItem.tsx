import {Product} from './Product';

export interface CartItem {
  cartId: string;

  product: Product;
  quantity: number;
}
