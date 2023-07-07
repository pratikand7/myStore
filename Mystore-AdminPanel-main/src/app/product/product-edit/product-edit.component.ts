import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { BrandService } from 'src/app/brand/brand.service';
import { CategoryService } from 'src/app/category/category.service';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css'],
})
export class ProductEditComponent {
  id: number = 0;
  title: string = '';
  description: string = '';
  price: string = '';
  categoryId = 12;
  brandId = 2;
  image = undefined;
  categories: any = [];
  brands: any = [];

  constructor(
    private modal: NgbActiveModal,
    private toastr: ToastrService,
    private categoryService: CategoryService,
    private brandService: BrandService,
    private service: ProductService
  ) {}

  ngOnInit() {
    this.getAllCategories();
    this.getAllBrands();
  }

  getAllCategories() {
    this.categoryService.getAllCategories().subscribe((response: any) => {
      if (response.status == 'success') this.categories = response.data;
      else this.toastr.error(response.error);
    });
  }

  getAllBrands() {
    this.brandService.getAllBrands().subscribe((response: any) => {
      if (response.status == 'success') this.brands = response.data;
      else this.toastr.error(response.error);
    });
  }

  onImageUpload(event: any) {
    this.image = event.target.files[0];
  }

  onEdit() {
    if (this.title.length == 0) this.toastr.warning('Please add title !');
    else if (this.description.length == 0)
      this.toastr.warning('Please add description !');
    else if (this.price.length == 0) this.toastr.warning('Please add price !');
    else if (this.image == undefined)
      this.toastr.warning('Please select image !');
    else {
      this.service
        .editProduct(
          this.id,
          this.title,
          this.description,
          this.price,
          this.categoryId,
          this.brandId,
          this.image
        )
        .subscribe((response: any) => {
          if (response.status == 'success') {
            this.modal.dismiss('success');
            this.toastr.success('Product edited successfully !');
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
