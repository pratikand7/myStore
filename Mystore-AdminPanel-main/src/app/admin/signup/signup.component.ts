import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from '../admin.service';
import * as EmailValidator from 'email-validator';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  firstName = '';
  lastName = '';
  phone = '';
  email = '';
  password = '';
  confirmPassword = '';

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private service: AdminService
  ) {}

  onSignup() {
    if (this.firstName.length == 0) {
      this.toastr.warning('Please enter First Name !');
    } else if (this.lastName.length == 0) {
      this.toastr.warning('Please enter Last Name !');
    } else if (this.phone.length == 0) {
      this.toastr.warning('Please enter Mobile Number !');
    } else if (this.phone.toString().length != 10) {
      this.toastr.error('Please enter a valid Mobile Number !');
    } else if (this.email.length == 0) {
      this.toastr.warning('Please enter Email !');
    } else if (this.password.length == 0) {
      this.toastr.warning('Please enter Password !');
    } else if (EmailValidator.validate(this.email) == false) {
      this.toastr.error('Invalid Email !');
    } else if (this.password.length < 8) {
      this.toastr.error('Password must have at least 8 characters !');
    } else if (this.confirmPassword.length == 0) {
      this.toastr.warning('Please confirm a Password !');
    } else if (this.password != this.confirmPassword) {
      this.toastr.error("Password and Confirm Password field doesn't match !");
    } else {
      this.service
        .onSignup(
          this.firstName,
          this.lastName,
          this.phone,
          this.email,
          this.password
        )
        .subscribe((response: any) => {
          if (response.status == 'success') {
            this.toastr.success('Signed up successfully !');
            this.router.navigate(['/login']);
          } else this.toastr.error(response.error);
        });
    }
  }
}
