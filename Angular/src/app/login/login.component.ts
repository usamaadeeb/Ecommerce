import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form = new FormData();
  res = new Response();

  headers = new HttpHeaders();

  jwt: string = '';
  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onformsubmit(val: any) {
    this.form = new FormData();
    this.form.append('username', val.username);
    this.form.append('password', val.password);

    this.http.post<any>('http://localhost:5000/Login', this.form).subscribe(
      (res) => {
        if (res != 'User not found' && res != 'Wrong Password') {


          localStorage.setItem('token', res);
          Swal.fire('Welcome', 'Successfully Login', 'success');
          this.router.navigate(['/home']);
        } else if (res != 'Wrong Password') {
          Swal.fire('User not found', 'Try again', 'info');
          console.log('User not found');
        } else if (res != 'User not found') {
          Swal.fire('Wrong Password', 'Try again', 'error');
        }
      },
      (err) => console.log(err.message)
    );
  }
}
