import { getLocaleDateTimeFormat } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProductReviewService } from '../product-review.service';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.css'],
})
export class ProductInfoComponent {
  product: any = {};
  review = '';
  reviews = [];
  rating = 0;

  constructor(
    private activeRouter: ActivatedRoute,
    private service: ProductService,
    private reviewService: ProductReviewService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    const productId = this.activeRouter.snapshot.queryParams['id'];
    this.getProductInfo(productId);
  }

  getProductInfo(id: number) {
    this.service.getProductInfo(id).subscribe((response: any) => {
      if (response.status == 'success') {
        this.product = response.data[0];
        this.getProductReviews();
      } else this.toastr.error(response.error);
    });
  }

  addProductReview() {
    this.reviewService
      .addProductReview(this.product.id, this.rating, this.review)
      .subscribe((response: any) => {
        if (response.status == 'success') {
          this.getProductReviews();
          this.toastr.success('Product Review added !');
        } else this.toastr.error(response.error);
      });
  }

  getProductReviews() {
    this.reviewService
      .getProductReviews(this.product.id)
      .subscribe((response: any) => {
        if (response.status == 'success') {
          this.reviews = response.data;
          this.reviews.forEach((review: any) => {
            review.createdOn = new Date()
              .toISOString()
              .slice(0, 19)
              .replace('T', ' ');
          });
        } else this.toastr.error(response.error);
      });
  }
}
