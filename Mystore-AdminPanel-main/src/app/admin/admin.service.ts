import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
} from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class AdminService implements CanActivate {
  url: string = 'http://localhost:7000/admin';

  constructor(
    private http: HttpClient,
    private router: Router,
    private toastr: ToastrService
  ) {}

  onLogin(email: string, password: string) {
    const body = {
      email: email,
      password: password,
    };
    return this.http.post(this.url + '/login', body);
  }

  onSignup(
    firstName: string,
    lastName: string,
    phone: string,
    email: string,
    password: string
  ) {
    const body = {
      firstName: firstName,
      lastName: lastName,
      phone: phone,
      email: email,
      password: password,
    };
    return this.http.post(this.url + '/signup', body);
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (!sessionStorage['token']) {
      this.router.navigate(['/login']);
      this.toastr.warning('Please login first');
      return false;
    }
    return true;
  }
}
