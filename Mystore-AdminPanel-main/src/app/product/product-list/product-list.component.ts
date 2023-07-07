import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ProductAddComponent } from '../product-add/product-add.component';
import { ProductEditComponent } from '../product-edit/product-edit.component';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent {
  products = [];

  constructor(
    private service: ProductService,
    private toastr: ToastrService,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.getAllProducts();
  }

  getAllProducts() {
    this.service.getAllProducts().subscribe((response: any) => {
      if (response.status == 'success') this.products = response.data;
      else this.toastr.error(response.error);
    });
  }

  onAdd() {
    const modalRef = this.modalService.open(ProductAddComponent, {
      size: 'lg',
    });
    modalRef.result.finally(() => {
      this.getAllProducts();
    });
  }

  onDelete(id: number) {
    this.service.deleteProduct(id).subscribe((response: any) => {
      if (response.status == 'success') {
        this.toastr.success('Product deleted successfully !');
        this.getAllProducts();
      } else this.toastr.error(response.error);
    });
  }

  onEdit(product: any) {
    const modalRef = this.modalService.open(ProductEditComponent, {
      size: 'lg',
    });
    const component = modalRef.componentInstance as ProductEditComponent;
    component.id = product.id;
    component.title = product.title;
    component.description = product.description;
    component.price = product.price;
    component.categoryId = product.categoryId;
    component.brandId = product.brandId;
    component.image = product.imageFile;
    modalRef.result.finally(() => {
      this.getAllProducts();
    });
  }
}
