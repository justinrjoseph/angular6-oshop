import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from 'shared/shared.module';

import { ProductFormComponent } from './components/product-form/product-form.component';
import { AdminProductsComponent } from './components/products/products.component';
import { AdminOrdersComponent } from './components/orders/orders.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    AdminRoutingModule
  ],
  declarations: [
    ProductFormComponent,
    AdminProductsComponent,
    AdminOrdersComponent
  ]
})
export class AdminModule {}
