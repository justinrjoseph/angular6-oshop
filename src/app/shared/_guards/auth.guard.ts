import { Injectable } from '@angular/core';

import { CanActivate, RouterStateSnapshot, Router } from '@angular/router';

import { AuthService } from 'shared/_services/auth.service';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private _auth: AuthService, private _router: Router) {}

  canActivate(
    next,
    state: RouterStateSnapshot): Observable<boolean> {
    return this._auth.user$.map((user) => {
      if ( user ) return true;

      this._router.navigate(['/login'], {
        queryParams: {
          returnUrl: state.url
        }
      });

      return false;
    });
  }
}
