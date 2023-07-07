import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements CanActivate {
  url = 'http://localhost:7100/user';

  constructor(
    private http: HttpClient,
    private router: Router,
    private toastr: ToastrService
  ) {}

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

  onLogin(email: string, password: string) {
    const body = {
      email: email,
      password: password,
    };
    return this.http.post(this.url + '/login', body);
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (!sessionStorage['token']) {
      this.router.navigate(['/home/home_page']);
      this.toastr.warning('Please login first');
      return false;
    }
    return true;
  }
}
