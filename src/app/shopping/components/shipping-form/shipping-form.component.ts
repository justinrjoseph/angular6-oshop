import { Component, Input, OnInit, OnDestroy } from '@angular/core';

import { Cart } from 'shared/_models/cart';
import { Order } from 'shared/_models/order';

import { Subscription } from 'rxjs/Subscription';

import { AuthService } from 'shared/_services/auth.service';
import { OrderService } from 'shared/_services/order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnInit, OnDestroy {
  @Input('cart') cart: Cart;

  userId: string;
  subscription: Subscription;
  shipping = {};

  constructor(
    private _authService: AuthService,
    private _orderService: OrderService,
    private _router: Router
  ) {}

  async ngOnInit() {
    this.subscription = this._authService.user$.
      subscribe((user) => this.userId = user.uid);
  }

  async placeOrder() {
    const order = new Order(this.userId, this.shipping, this.cart);

    const result = await this._orderService.save(order);

    this._router.navigate(['/order-success', result.key]);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
