import { HttpClient } from '@angular/common/http';
import { Component, ComponentFactoryResolver, Injectable, OnInit } from '@angular/core';

@Component({
  selector: 'app-stripe',
  templateUrl: './stripe.component.html',
  styleUrls: ['./stripe.component.css'],
})
@Injectable()
export class StripeComponent implements OnInit {


  constructor() {

  }
  obj!:object;

  handler: any = null;
  ngOnInit() {


  }


}
