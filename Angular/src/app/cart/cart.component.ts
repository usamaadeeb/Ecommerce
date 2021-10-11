import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';

import Swal from 'sweetalert2';
import { Products, lineitems, price } from '../product/products';
import {
  Delete_item_in_Cart,
  Update_item_in_Cart,
} from '../store/actions/cart.actions';

import { CartState } from '../store/states/cart.state';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  res!: string;
  prod!: Array<lineitems>;
  products!: Array<Products>;
  price!: number;

  @Select(CartState.DisplayCart) Cart$!: Observable<Products[]>;

  @Select(CartState.price) price$!: Observable<number>;

  // Constructor

  constructor(
    private store: Store,
    private http: HttpClient,
    private Route: Router
  ) {}
  // Initializing
  ngOnInit() {}

  updateProduct(id: number, qty: string) {
    var quantity = parseInt(qty);
    this.store.dispatch(new Update_item_in_Cart(id, quantity));
  }

  DeleteProduct(id: number) {
    this.store.dispatch(new Delete_item_in_Cart(id));
  }

  async sendproduct() {
    this.Cart$.subscribe(
      (product) => {
        this.products = product;
      },
      (err) => console.log(err)
    );
    if(this.products.length!=0){
      let array: Array<lineitems> = this.products.map((product) => {
        return {
          price: product.id,
          quantity: product.quantity,
        };
      });
      let token: string|null = localStorage.getItem('token');
      if (token!=null) {
        token = 'Bearer ' + token;
        let Header: HttpHeaders = new HttpHeaders({
          'content-type': 'application/json',
          'charset': 'utf-8',
          'Access-Control-Allow-Origin': '*',
          'Authorization': token,
        });
        console.log("2nd check")
        this.http
          .post<any>(
            'http://localhost:5000/payment',
            { products: array },
            { headers: Header }
          )
          .subscribe(
            (res) => {

              if (typeof(res) == 'object') {
                console.log("Hello");
                window.location.href = res.url;
              }


              },
            (err) => {
              Swal.fire('Error', err, 'error');
              console.log(err, 'error');
            }
          );
      }
      else{
        Swal.fire('Login Required', 'Redirect to Login Page', 'info');
        this.Route.navigate(['/Login']);
      // this.Route.navigateByUrl('localhost:4200/Login');

        return console.log("Token not available")

      }
    }
    else{
      return Swal.fire('Empty Cart', 'Add your Products', 'info');
      console.log("Products not available")
    }


  }
}
