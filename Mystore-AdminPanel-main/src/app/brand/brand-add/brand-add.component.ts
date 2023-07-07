import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { BrandService } from '../brand.service';

@Component({
  selector: 'app-brand-add',
  templateUrl: './brand-add.component.html',
  styleUrls: ['./brand-add.component.css'],
})
export class BrandAddComponent {
  title: string = '';
  description: string = '';

  constructor(
    private toastr: ToastrService,
    private service: BrandService,
    private modal: NgbActiveModal
  ) {}

  onAdd() {
    if (this.title.length == 0) this.toastr.warning('Please add title !');
    else if (this.description.length == 0)
      this.toastr.warning('Please add description !');
    else {
      this.service
        .addBrand(this.title, this.description)
        .subscribe((response: any) => {
          if (response.status == 'success') {
            this.toastr.success('Brand added successfully !');
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
