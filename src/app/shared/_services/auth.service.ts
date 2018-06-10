import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import * as firebase from 'firebase';

import { AngularFireAuth } from 'angularfire2/auth';

import { ActivatedRoute } from '@angular/router';

import { UserService } from './user.service';

import { User } from 'shared/_models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService  {
  user$: Observable<firebase.User>;

  constructor(
    private _afAuth: AngularFireAuth,
    private _route: ActivatedRoute,
    private _userService: UserService) {
    this.user$ = this._afAuth.authState;
  }

  login(): void {
    const returnUrl = this._route.snapshot.queryParamMap.get('returnUrl') || '/';

    localStorage.setItem('returnUrl', returnUrl);

    this._afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }

  logout(): void {
    this._afAuth.auth.signOut();
  }

  get appUser$(): Observable<User> {
    return this.user$
      .switchMap((user) => {
        if ( user ) return this._userService.get(user.uid).valueChanges();

        return Observable.of(null);
      });
  }
}
