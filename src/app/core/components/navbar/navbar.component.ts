import { Component, OnInit } from '@angular/core';

import { User } from 'shared/_models/user';
import { Cart } from 'shared/_models/cart';

import { AuthService } from 'shared/_services/auth.service';
import { CartService } from 'shared/_services/cart.service';

import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  user: User;
  cart$: Observable<Cart>;

  constructor(private _auth: AuthService, private _cartService: CartService) {}

  async ngOnInit() {
    this._auth.appUser$.subscribe((user) => this.user = user);

    this.cart$ = await this._cartService.get();
  }

  logout(): void {
    this._auth.logout();
  }
}
