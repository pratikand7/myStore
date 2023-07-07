import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  userName: string = '';

  constructor(private router: Router, private toastr: ToastrService) {}

  ngOnInit() {
    this.userName = sessionStorage['name'];
  }

  onLogin() {
    this.router.navigate(['/auth/login']);
  }

  onLogout() {
    sessionStorage.removeItem('name');
    sessionStorage.removeItem('token');
    this.toastr.success('Logged Out Successfully!');
    this.router.navigate(['/home/home_page']);
  }
}
