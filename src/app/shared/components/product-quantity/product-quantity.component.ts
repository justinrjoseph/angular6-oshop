import { Component, Input } from '@angular/core';

import { Cart } from 'shared/_models/cart';
import { Product } from 'shared/_models/product';

import { CartService } from 'shared/_services/cart.service';

@Component({
  selector: 'product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent {
  @Input('product') product: Product;
  @Input('cart') cart: Cart;

  constructor(private _cartService: CartService) {}

  addToCart() {
    this._cartService.addItem(this.product);
  }

  removeFromCart() {
    this._cartService.removeItem(this.product);
  }
}
