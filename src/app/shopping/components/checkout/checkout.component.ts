import { Component, OnInit } from '@angular/core';

import { Cart } from 'shared/_models/cart';

import { CartService } from 'shared/_services/cart.service';

import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckOutComponent implements OnInit {
  cart$: Observable<Cart>;

  constructor(private _cartService: CartService) {}

  async ngOnInit() {
    this.cart$ = await this._cartService.get();
  }
}
