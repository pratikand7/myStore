import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent {
  users = [];

  constructor(private service: UserService, private toastr: ToastrService) {}

  ngOnInit() {
    this.getAllUsers();
  }

  getAllUsers() {
    this.service.getAllUsers().subscribe((response: any) => {
      if (response.status == 'success') this.users = response.data;
      else this.toastr.error(response.error);
    });
  }

  changeStatus(user: any) {
    this.service
      .changeStatus(user.id, user.status == 1 ? 2 : 1)
      .subscribe((response: any) => {
        if (response.status == 'success') {
          this.getAllUsers();
          if (user.status == 1) this.toastr.success('Account suspended !');
          else this.toastr.success('Account Activated !');
        } else {
          this.toastr.error(response.error);
        }
      });
  }
}
