import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart-be',
  templateUrl: './cart-be.component.html',
  styleUrls: ['./cart-be.component.css']
})
export class CartBEComponent implements OnInit {
  x:string="";
  constructor(private http: HttpClient,private HttpHeader: HttpHeaders) {


  }

  ngOnInit(): void {
    // this.x=JSON.parse(localStorage.getItem('JWT') || '{}')
    // this.HttpHeader =new HttpHeaders()
    // this.HttpHeader.append('Authorization',this.x)
    // this.http.get('http://localhost:5000/Cart',).subscribe(
    // (res) => {
    //   console.log(res);
    // },(err)=>console.log(err)

    // )}

}
}
