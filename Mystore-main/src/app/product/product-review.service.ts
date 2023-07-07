import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductReviewService {
  httpOptions = {
    headers: new HttpHeaders({
      token: sessionStorage['token'],
    }),
  };

  url = 'http://localhost:7100/review';

  constructor(private http: HttpClient) {}

  getProductReviews(productId: number) {
    return this.http.get(this.url + '/' + productId, this.httpOptions);
  }

  addProductReview(productId: number, rating: number, review: string) {
    const body = {
      rating,
      review,
    };
    return this.http.post(this.url + '/' + productId, body, this.httpOptions);
  }
}
