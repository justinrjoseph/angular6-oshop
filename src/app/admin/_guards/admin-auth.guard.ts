import { Injectable } from '@angular/core';

import { CanActivate } from '@angular/router';

import { AuthService } from 'shared/_services/auth.service';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {
  constructor(private _auth: AuthService) {}

  canActivate(): Observable<boolean> {
    return this._auth.appUser$.map((user) => user.isAdmin);
  }
}
