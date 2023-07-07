import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AddressService } from '../address.service';

@Component({
  selector: 'app-address-edit',
  templateUrl: './address-edit.component.html',
  styleUrls: ['./address-edit.component.css'],
})
export class AddressEditComponent {
  id = 0;
  line1 = '';
  line2 = '';
  city = '';
  state = '';
  pinCode = '';
  title = '';

  constructor(
    private modal: NgbActiveModal,
    private toastr: ToastrService,
    private service: AddressService
  ) {}

  onEdit() {
    if (this.title.length == 0) this.toastr.warning('Please add title !');
    else if (this.line1.length == 0) this.toastr.warning('Please add line1 !');
    else if (this.line2.length == 0) this.toastr.warning('Please add line2 !');
    else if (this.city.length == 0) this.toastr.warning('Please add city !');
    else if (this.state.length == 0) this.toastr.warning('Please add state !');
    else if (this.pinCode.length == 0)
      this.toastr.warning('Please add pin-code !');
    else {
      this.service
        .editAddress(
          this.id,
          this.title,
          this.line1,
          this.line2,
          this.city,
          this.state,
          this.pinCode
        )
        .subscribe((response: any) => {
          if (response.status == 'success') {
            this.modal.dismiss('success');
            this.toastr.success('Address added successfully !');
          } else {
            this.toastr.error(response.error);
            this.modal.dismiss('error');
          }
        });
    }
  }

  onCancel() {
    this.modal.dismiss('cancel');
  }
}
