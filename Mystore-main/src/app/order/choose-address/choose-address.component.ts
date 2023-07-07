import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AddressService } from 'src/app/user/address.service';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-choose-address',
  templateUrl: './choose-address.component.html',
  styleUrls: ['./choose-address.component.css'],
})
export class ChooseAddressComponent {
  addresses = [];
  constructor(
    private modal: NgbActiveModal,
    private service: AddressService,
    private toastr: ToastrService,
    private orderService: OrderService
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

  onSelect(addressId: number) {
    this.orderService.placeOrder(addressId).subscribe((response: any) => {
      if (response.status == 'success') {
        this.toastr.success('Congratulations !! Order Placed !');
        this.modal.dismiss('success');
      } else {
        this.toastr.error(response.error);
        this.modal.dismiss('error');
      }
    });
  }

  onCancel() {
    this.modal.dismiss('cancel');
  }
}
