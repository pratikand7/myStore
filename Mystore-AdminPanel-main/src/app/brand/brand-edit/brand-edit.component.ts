import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { BrandService } from '../brand.service';

@Component({
  selector: 'app-brand-edit',
  templateUrl: './brand-edit.component.html',
  styleUrls: ['./brand-edit.component.css'],
})
export class BrandEditComponent {
  title: string = '';
  description: string = '';
  id: number = 0;

  constructor(
    private modal: NgbActiveModal,
    private service: BrandService,
    private toastr: ToastrService
  ) {}

  onEdit() {
    if (this.title.length == 0) this.toastr.warning('Please add title !');
    else if (this.description.length == 0)
      this.toastr.warning('Please add description !');
    else {
      this.service
        .editBrand(this.id, this.title, this.description)
        .subscribe((response: any) => {
          if (response.status == 'success') {
            this.toastr.success('Brand updated successfully !');
            this.modal.dismiss('success');
          } else {
            this.toastr.error('Something went wrong ! Please add again !!');
            this.modal.dismiss('error');
          }
        });
    }
  }

  onCancel() {
    this.modal.dismiss('cancel');
  }
}
