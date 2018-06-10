import { Injectable } from '@angular/core';

import * as firebase from 'firebase';

import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';

import { User } from 'shared/_models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private _db: AngularFireDatabase) {}

  save(user: firebase.User): void {
    this._db.object(`/users/${user.uid}`).update({
      name: user.displayName,
      email: user.email
    });
  }

  get(uid: string): AngularFireObject<User> {
    return this._db.object(`/users/${uid}`);
  }
}
