import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private Route:Router) { }

  ngOnInit(): void {
  }

  logout(){
 
localStorage.removeItem("token")
Swal.fire('Login Required', 'Redirect to Login Page', 'info');
this.Route.navigate(['/Login']);
console.log("this")

  }

}
