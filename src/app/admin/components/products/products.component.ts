import { Component, OnInit, OnDestroy } from '@angular/core';

import { Product } from 'shared/_models/product';

import { ProductService } from 'shared/_services/product.service';

import { Subscription } from 'rxjs';

import { DataTableResource } from 'angular5-data-table';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  products: Product[];
  subscription: Subscription;
  tableResource: DataTableResource<Product>;
  items: Product[] = [];
  itemCount: number;

  constructor(private _productService: ProductService) {}

  ngOnInit(): void {
    this.subscription = this._productService.getAll()
      .subscribe((products) => {
        this.products = products;

        this._initializeTable(products);
      });
  }

  filter(query: string) {
    const filteredProducts = query ?
      this.products.filter((product) => {
        return product.name.toLowerCase().includes(query.toLowerCase());
      }) :
      this.products;

    this._initializeTable(filteredProducts);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  reloadItems(params) {
    if ( !this.tableResource ) return;

    this.tableResource
      .query(params)
      .then((items) => this.items = items);
  }

  private _initializeTable(products: Product[]) {
    this.tableResource = new DataTableResource(products);

    this.tableResource
      .query({ offset: 0 })
      .then((items) => this.items = items);

    this.tableResource.count()
      .then((count) => this.itemCount = count);
  }
}
