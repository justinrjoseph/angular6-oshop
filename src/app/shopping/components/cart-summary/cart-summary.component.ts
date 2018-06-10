import { Component, Input } from '@angular/core';

import { Cart } from 'shared/_models/cart';

@Component({
  selector: 'cart-summary',
  templateUrl: './cart-summary.component.html',
  styleUrls: ['./cart-summary.component.css']
})
export class CartSummaryComponent {
  @Input('cart') cart: Cart;

  constructor() {}
}
