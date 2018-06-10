import { Injectable } from '@angular/core';

import { AngularFireDatabase } from 'angularfire2/database';

import { Product } from 'shared/_models/product';

import { Cart } from 'shared/_models/cart';

import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  constructor(private _db: AngularFireDatabase) {}

  async get(): Promise<Observable<Cart>> {
    const cartId = await this._getOrCreateCartId();

    return this._db.object(`/carts/${cartId}`)
      .snapshotChanges()
      .map((data) => {
        const { items } = data.payload.val();

        return new Cart(items);
      });
  }

  async addItem(product: Product) {
    this._updateItem(product, 1);
  }

  async removeItem(product: Product) {
    this._updateItem(product, -1);
  }

  async clear() {
    const cartId = await this._getOrCreateCartId();

    this._db.object(`/carts/${cartId}/items`).remove();
  }

  private async _updateItem(product: Product, change: number) {
    const cartId = await this._getOrCreateCartId();

    const item = this._getItem(cartId, product.key);
    const itemSnapshot$ = item.snapshotChanges();

    itemSnapshot$
      .take(1)
      .subscribe((data) => {
        const existingProduct = { ...data.payload.val() };

        const { name, imageUrl, price } = product;

        const quantity = (existingProduct.quantity || 0) + change;

        if ( quantity === 0 ) item.remove();
        else item.update({ name, imageUrl, price, quantity });
      });
  }

  private _getItem(cartId: string, productId: string) {
    return this._db.object(`/carts/${cartId}/items/${productId}`);
  }

  private _create() {
    return this._db.list('/carts').push({
      dateCreated: new Date().getTime()
    });
  }

  private async _getOrCreateCartId(): Promise<string> {
    const cartId = localStorage.getItem('cartId');

    if ( cartId ) return cartId;

    const cart = await this._create();

    localStorage.setItem('cartId', cart.key);

    return cart.key;
  }
}
