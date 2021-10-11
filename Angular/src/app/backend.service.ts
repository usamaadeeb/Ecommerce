import { Injectable } from '@angular/core';
import { Products } from './product/products';
import {map} from 'rxjs/operators'
import {from, Observable} from 'rxjs'
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root',
})
export class BackendService {

  link_category:string="";
  link_product:string="";
  products:any;
  constructor(private http: HttpClient,) {

  }
  AllProductsService() :Observable<any> {

    return this.http
      .get<Products[]>('https://fakestoreapi.com/products');


  }

  CategoricalProductsService(categories:String):Observable<any> {
    this.link_category = `https://fakestoreapi.com/products/category/${categories}`;

  return this.http.get<any>(this.link_category)

  }



  SingleProductsService(productid: Number):Observable<any> {
    this.link_product = `https://fakestoreapi.com/products/${productid}`;

    return this.http.get(this.link_product);
    ;

  }


}
