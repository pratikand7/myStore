import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.css'],
})
export class CategoryEditComponent {
  title: string = '';
  description: string = '';
  id: number = 0;

  constructor(
    private modal: NgbActiveModal,
    private service: CategoryService,
    private toastr: ToastrService
  ) {}

  onEdit() {
    if (this.title.length == 0) this.toastr.warning('Please add title !');
    else if (this.description.length == 0)
      this.toastr.warning('Please add description !');
    else {
      this.service
        .editCategory(this.id, this.title, this.description)
        .subscribe((response: any) => {
          if (response.status == 'success') {
            this.modal.dismiss('ok');
            this.toastr.success('Category updated successfully !');
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
