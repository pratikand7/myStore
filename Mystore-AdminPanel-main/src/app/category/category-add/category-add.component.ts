import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-category-add',
  templateUrl: './category-add.component.html',
  styleUrls: ['./category-add.component.css'],
})
export class CategoryAddComponent {
  title: string = '';
  description: string = '';

  constructor(
    private modal: NgbActiveModal,
    private service: CategoryService,
    private toastr: ToastrService
  ) {}

  onAdd() {
    if (this.title.length == 0) this.toastr.warning('Please add title !');
    else if (this.description.length == 0)
      this.toastr.warning('Please add description !');
    else {
      this.service
        .addCategory(this.title, this.description)
        .subscribe((response: any) => {
          if (response.status == 'success') {
            this.modal.dismiss('ok');
            this.toastr.success('Category added successfully !');
          } else {
            this.modal.dismiss('error');
            this.toastr.error('Something went wrong ! Please add again !!');
          }
        });
    }
  }

  onCancel() {
    this.modal.dismiss('cancel');
  }
}
