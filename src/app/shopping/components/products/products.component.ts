import { Component, OnInit } from '@angular/core';

import { Product } from 'shared/_models/product';
import { Cart } from 'shared/_models/cart';

import { ProductService } from 'shared/_services/product.service';
import { CartService } from 'shared/_services/cart.service';

import { ActivatedRoute, Params } from '@angular/router';

import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  category: string;
  cart$: Observable<Cart>;

  constructor(
    private _productService: ProductService,
    private _cartService: CartService,
    private _route: ActivatedRoute
  ) {}

  async ngOnInit() {
    this._populateProducts();

    this.cart$ = await this._cartService.get();
  }

  private _populateProducts() {
    this._productService.getAll()
      .switchMap((products) => {
        this.products = products;

        return this._route.queryParamMap;
      })
      .subscribe((params: Params) => {
        this.category = params.get('category');

        this._applyFilter();
      });
  }

  private _applyFilter() {
    this.filteredProducts = this.category ?
    this.products.filter((product) => product.category === this.category) :
    this.products;
  }
}
