import { Component, OnInit } from '@angular/core';

import { Products } from '../product/products';
import { BackendService } from '../backend.service';
import { Select, Store } from '@ngxs/store';
import { Add_item_in_Cart, GetProducts } from '../store/actions/cart.actions';
import { CartState } from '../store/states/cart.state';
import { Observable, pipe, Subscription } from 'rxjs';
import { Pipe, PipeTransform } from '@angular/core'

import { Ng2SearchPipeModule } from 'ng2-search-filter';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})


export class ProductComponent implements OnInit,PipeTransform{
transform(){



}
  toggle: boolean = true;
  products: Products[] = [];
  // products:Promise<any>
  x: any;
  @Select(CartState.getproductsList)
  product$!: Observable<Products[]>;

  @Select(CartState.getloadedproduct)
  load$!: Observable<Boolean>;
  subscribe!: Subscription;
  pro: Products[] = [];


  constructor(private backend: BackendService, private store: Store) {
    // this.products=
  }
  title = 'Angular Search Using ng2-search-filter';
  searchText="";
  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    this.load$.subscribe((booleanvalue) => {
      if (!booleanvalue) {
        this.store.dispatch(new GetProducts());
      }
    });

    //   if(this.backend.products){
    //     this.products=this.backend.products;
    //     this.toggle=false
    //   console.log("Zero")
    //   }
    //   else {
    //           this.backend.AllProductsService().subscribe(
    //             (res) => {
    //               this.products = res;
    //               this.backend.products=res;
    //               if (this.products.length) {
    //                 this.toggle = false;
    //                 console.log(this.products);
    //               } else {
    //                 this.toggle = true;
    //               }
    //             },
    //             (error) => {
    //               console.log(error);
    //             }
    //           );
    //           console.log(typeof this.products);
    //         }
    // }

    // addProduct(product: Products) {
    //   this.Cart.addProduct(product);
  }

  addProduct(product:Products) {
this.store.dispatch(new Add_item_in_Cart(product))



  }
}
