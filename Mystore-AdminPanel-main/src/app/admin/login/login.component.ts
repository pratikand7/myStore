import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(
    private service: AdminService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  onLogin() {
    if (this.email == '') this.toastr.warning('Please enter email !');
    else if (this.password == '')
      this.toastr.warning('Please enter password !');
    else {
      this.service
        .onLogin(this.email, this.password)
        .subscribe((response: any) => {
          if (response.status == 'success') {
            this.toastr.success('Welcome !');
            const user = response.data;
            sessionStorage['name'] = user.firstName + ' ' + user.lastName;
            sessionStorage['token'] = user.token;
            this.router.navigate(['/product-list']);
          } else this.toastr.error(response.error);
        });
    }
  }

  onSignup() {
    this.router.navigate(['/signup']);
  }
}
