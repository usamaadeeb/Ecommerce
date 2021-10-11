import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { CartComponent } from '../cart/cart.component';
import { Products } from '../product/products';
import { BackendService } from '../backend.service';

import { ActivatedRoute } from '@angular/router';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { Select, Store } from '@ngxs/store';
import { CartState } from '../store/states/cart.state';
import { Observable } from 'rxjs';
import { Add_item_in_Cart, Category } from '../store/actions/cart.actions';

@Component({
  selector: 'app-category',

  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit {

  products: Products[] = [];
  toggle: boolean = false;
  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'indeterminate';
@Select(CartState.Category) category$!:Observable<Products[]>;

  public category: string = '';
  sub: any;

  // products:Promise<any>
  categories = localStorage.getItem('category')!;

  constructor(
    private http: HttpClient,
    private backend: BackendService,
    private Route: ActivatedRoute,
    private store : Store
  ) {
    // this.products=
  }

  ngOnInit() {
    this.sub = this.Route.params.subscribe((params) => {
      this.category = params['category'];
      console.log(typeof(this.category))
      this.store.dispatch(new Category(this.category))
      this.category$.subscribe(category => this.products = category)
    });


    // this.backend.CategoricalProductsService(this.category).subscribe(
    //   (res) => {
    //     this.products = res;

    //     if (this.products.length) {
    //       this.toggle = false;
    //       console.log(this.products);
    //     } else {
    //       this.toggle = true;
    //     }
    //   },
    //   (error) => {
    //     console.log(error);
    //   }
    // );
    // console.log(typeof this.products);
  }
  addProduct(product:Products) {
    this.store.dispatch(new Add_item_in_Cart(product))
  }
}
