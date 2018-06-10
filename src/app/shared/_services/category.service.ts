import { Injectable } from '@angular/core';

import { AngularFireDatabase } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  constructor(private _db: AngularFireDatabase) {}

  getAll() {
    return this._db
      .list('/categories', (ref) => ref.orderByChild('name'))
      .snapshotChanges()
      .map((data) => {
        return data.map((category) => {
          const { key } = category;
          const { name } = category.payload.val();

          return { key, name };
        });
      });
  }
}
