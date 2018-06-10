import { Injectable } from '@angular/core';

import { AngularFireDatabase } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private _db: AngularFireDatabase) {}

  getAll() {
    return this._db.list('/products')
      .snapshotChanges()
      .map((data) => {
        return data.map((product) => {
          const { key } = product;
          const { name, price, category, imageUrl } = product.payload.val();

          return { key, name, price, category, imageUrl };
        });
      });
  }

  get(productId) {
    return this._db.object(`/products/${productId}`).valueChanges();
  }

  create(product) {
    return this._db.list('/products').push(product);
  }

  update(productId, product) {
    return this._db.object(`/products/${productId}`).update(product);
  }

  delete(productId) {
    return this._db.object(`/products/${productId}`).remove();
  }
}
