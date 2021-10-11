import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CartComponent } from '../cart/cart.component';
import { Products } from '../product/products';
import { BackendService } from '../backend.service';
import { ActivatedRoute } from '@angular/router';
import { CartState } from '../store/states/cart.state';
import { Select, Store } from '@ngxs/store';
import { CategoryComponent } from '../category/category.component';
import { Add_item_in_Cart, Category, Specific } from '../store/actions/cart.actions';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-specific',
  templateUrl: './specific.component.html',
  styleUrls: ['./specific.component.css'],
})
export class SpecificComponent implements OnInit, OnDestroy {
  id: number = 0;

  product: Products = {
    id: 0,
    title: '',
    category: '',
    price: 0,
    image: '',
    Incart: false,
    quantity: 0,
    description: '',
    rating: {
      count: 0,
      rate: 0,
    },
  };

  @Select(CartState.Specific) product$!: Observable<Products>;

  @Select(CartState.Category) products$!: Observable<Products[]>;

  private sub!: Subscription;
  products: Products[] = [];
  // products:Promise<any>


  constructor(
    private http: HttpClient,
    private backend: BackendService,
    private store: Store,
    private Route: ActivatedRoute
  ) {
    // this.products=
  }

  ngOnInit() {
    this.Route.params.subscribe((params) => {
      this.id = params['specific'];
      console.log(this.id);
      this.store.dispatch(new Specific(this.id));
      this.sub = this.product$.subscribe((product) => {
        this.product = product;
      });

      console.log(this.product.category, '....Product.....');
      this.store.dispatch(new Category(this.product.category));
    });
    // this.backend.SingleProductsService(this.id).subscribe(
    //   (res)=> {
    //     this.product = res
    //     console.log(this.product)
    //   },
    //     (error) =>{console.log(error)}
    // );
    // console.log(typeof(this.product));

    // this.backend.CategoricalProductsService(this.product.category).subscribe(
    //   (res)=> {
    //     this.products = res;
    //     console.log(this.products)
    //   },
    //     (error) =>{console.log(error)}

    // );
  }

  addProduct(product:Products) {
    this.store.dispatch(new Add_item_in_Cart(product))
  }

  ngOnDestroy() {
    this.sub.unsubscribe();

  }
}
