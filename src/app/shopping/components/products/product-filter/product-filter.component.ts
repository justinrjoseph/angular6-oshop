import { Component, OnInit, Input } from '@angular/core';

import { CategoryService } from 'shared/_services/category.service';

@Component({
  selector: 'product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent implements OnInit {
  @Input('category') category;

  categories$;

  constructor(private _categoryService: CategoryService) {}

  ngOnInit() {
    this.categories$ = this._categoryService.getAll();
  }
}
