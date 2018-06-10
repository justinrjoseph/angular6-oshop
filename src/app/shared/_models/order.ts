import { Cart } from './cart';

export class Order {
  datePlaced: number;
  items: any[];

  constructor(public userId: string, public shipping: any, cart: Cart) {
    this.datePlaced = new Date().getTime();

    this.items = cart.items.map((item) => {
      const { name, imageUrl, price, quantity, totalPrice } = item;

      return {
        product: { name, imageUrl, price },
        quantity,
        totalPrice
      };
    });
  }
}
