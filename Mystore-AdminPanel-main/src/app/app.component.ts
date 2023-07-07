import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'mystore-adminpanel';

  constructor(private router: Router, private toastr: ToastrService) {}

  onLogout() {
    sessionStorage.removeItem('name');
    sessionStorage.removeItem('token');
    this.toastr.success('Logged Out Successfully!');
    this.router.navigate(['/login']);
  }
}
