import { Injectable } from '@angular/core';

import { AngularFireDatabase } from 'angularfire2/database';

import { CartService } from './cart.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  constructor(
    private _db: AngularFireDatabase,
    private _cartService: CartService
  ) {}

  getAll() {
    return this._db.list('/orders').valueChanges();
  }

  getByUser(userId: string) {
    return this._db
      .list('/orders', (ref) => ref.orderByChild('userId').equalTo(userId))
      .valueChanges();
  }

  async save(order) {
    const result = await this._db.list('/orders').push(order);

    this._cartService.clear();

    return result;
  }
}
