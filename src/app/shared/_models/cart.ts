import { CartItem } from './cart-item';
import { Product } from './product';

export class Cart {
  items: CartItem[] = [];

  constructor(private itemsMap: { [productId: string]: CartItem }) {
    this.itemsMap = itemsMap || {};

    for ( const productId in itemsMap ) {
      if ( itemsMap[productId] ) {
        const item = itemsMap[productId];

        this.items.push(new CartItem({ key: productId, ...item }));
      }
    }
  }

  getQuantity(product: Product) {
    const item = this.itemsMap[product.key];

    return item ? item.quantity : 0;
  }

  get totalItemsCount(): number {
    let count = 0;

    for ( const productId in this.items ) {
      if ( this.items[productId] )
        count += this.items[productId].quantity;
    }

    return count;
  }

  get totalPrice(): number {
    let sum = 0;

    for ( const productId in this.items )
      sum += this.items[productId].totalPrice;

    return sum;
  }
}
