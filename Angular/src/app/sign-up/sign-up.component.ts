import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

import { delay } from 'rxjs/operators';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',

  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  form = new FormData();
  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
    ) {}

  ngOnInit(): void {}
  onformsubmit(formdata: any): void {
    this.form = new FormData();
    this.form.append('email', formdata.email);
    this.form.append('username', formdata.username);
    this.form.append('password', formdata.password);
    this.form.append('first_name', formdata.first_name);
    this.form.append('last_name', formdata.last_name);

    this.http.post<any>('http://localhost:5000/SignUp', this.form).subscribe(
      (res: string) => {
        if (res == 'success') {
          Swal.fire('Welcome', 'Successfully Sign Up', 'success');
          this.router.navigate(['/Login']);
        } else {
          Swal.fire('OOPS', 'User with this username already exists', 'error');
          this.router.navigate(['/Login']);
        }
      },

      (err) => console.log(err.message)
    );

    console.log('commmit');
  }
}
