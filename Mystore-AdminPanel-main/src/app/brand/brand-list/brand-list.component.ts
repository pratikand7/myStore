import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { BrandAddComponent } from '../brand-add/brand-add.component';
import { BrandEditComponent } from '../brand-edit/brand-edit.component';
import { BrandService } from '../brand.service';

@Component({
  selector: 'app-brand-list',
  templateUrl: './brand-list.component.html',
  styleUrls: ['./brand-list.component.css'],
})
export class BrandListComponent {
  brands = [];

  constructor(
    private service: BrandService,
    private toastr: ToastrService,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.getAllBrands();
  }

  getAllBrands() {
    this.service.getAllBrands().subscribe((response: any) => {
      if (response.status == 'success') this.brands = response.data;
      else this.toastr.error(response.error);
    });
  }

  onAdd() {
    const modalRef = this.modalService.open(BrandAddComponent);
    modalRef.result.finally(() => {
      this.getAllBrands();
    });
  }

  onEdit(brand: any) {
    const modalRef = this.modalService.open(BrandEditComponent);
    const component = modalRef.componentInstance as BrandEditComponent;
    component.title = brand.title;
    component.description = brand.description;
    component.id = brand.id;
    modalRef.result.finally(() => {
      this.getAllBrands();
    });
  }

  onDelete(id: number) {
    this.service.deleteBrand(id).subscribe((response: any) => {
      if (response.status == 'success') {
        this.toastr.success('Brand deleted successfully !');
        this.getAllBrands();
      } else this.toastr.success('Something went wrong ! Please try again !!');
    });
  }
}
