import { Component, Input } from '@angular/core';

import { Product } from 'shared/_models/product';
import { Cart } from 'shared/_models/cart';

import { CartService } from 'shared/_services/cart.service';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input('product') product: Product;
  @Input('cart') cart: Cart;
  @Input('show-actions') showActions = true;

  constructor(private _cartService: CartService) {}

  addToCart() {
    this._cartService.addItem(this.product);
  }
}
