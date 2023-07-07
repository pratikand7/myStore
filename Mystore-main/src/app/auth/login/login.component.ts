import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private service: AuthService
  ) {}

  onLogin() {
    if (this.email.length == 0) {
      this.toastr.warning('Please enter Email !');
    } else if (this.password.length == 0) {
      this.toastr.warning('Please enter Password !');
    } else {
      this.service
        .onLogin(this.email, this.password)
        .subscribe((response: any) => {
          if (response.status == 'success') {
            this.toastr.success('Welcome !');
            const user = response.data;
            sessionStorage['name'] = user.firstName + ' ' + user.lastName;
            sessionStorage['token'] = user.token;
            this.router.navigate(['/home/product/gallary']);
          } else this.toastr.error(response.error);
        });
    }
  }
}
