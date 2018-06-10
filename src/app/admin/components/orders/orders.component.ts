import { Component, OnInit } from '@angular/core';

import { OrderService } from 'shared/_services/order.service';

@Component({
  selector: 'admin-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class AdminOrdersComponent implements OnInit {
  orders$;

  constructor(private _orderService: OrderService) {}

  ngOnInit() {
    this.orders$ = this._orderService.getAll();
  }
}
