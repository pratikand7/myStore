import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AddressAddComponent } from '../address-add/address-add.component';
import { AddressEditComponent } from '../address-edit/address-edit.component';
import { AddressService } from '../address.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-address-list',
  templateUrl: './address-list.component.html',
  styleUrls: ['./address-list.component.css'],
})
export class AddressListComponent {
  addresses = [];
  constructor(
    private service: AddressService,
    private toastr: ToastrService,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.getAllAddresses();
  }

  getAllAddresses() {
    this.service.getAllAddresses().subscribe((response: any) => {
      if (response.status == 'success') this.addresses = response.data;
      else this.toastr.error(response.error);
    });
  }

  onAdd() {
    const modalRef = this.modalService.open(AddressAddComponent, {
      size: 'lg',
    });
    modalRef.result.finally(() => {
      this.getAllAddresses();
    });
  }

  onDelete(id: number) {
    this.service.deleteAddress(id).subscribe((response: any) => {
      if (response.status == 'success') {
        this.toastr.success('Address deleted successfully !');
        this.getAllAddresses();
      } else this.toastr.error(response.error);
    });
  }

  onEdit(address: any) {
    const modalRef = this.modalService.open(AddressEditComponent, {
      size: 'lg',
    });
    const component = modalRef.componentInstance as AddressEditComponent;
    component.id = address.id;
    component.line1 = address.line1;
    component.line2 = address.line2;
    component.city = address.city;
    component.state = address.state;
    component.pinCode = address.pinCode;
    component.title = address.title;
    modalRef.result.finally(() => {
      this.getAllAddresses();
    });
  }
}
