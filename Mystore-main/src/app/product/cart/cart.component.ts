import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ChooseAddressComponent } from 'src/app/order/choose-address/choose-address.component';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent {
  carts = [];
  totalPrice = 0;

  constructor(
    private service: CartService,
    private toastr: ToastrService,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.getCartItems();
  }

  getCartItems() {
    this.totalPrice = 0;
    this.service.getCartItems().subscribe((response: any) => {
      if (response.status == 'success') {
        this.carts = response.data;
        this.carts.forEach((item) => {
          this.totalPrice += item['quantity'] * item['price'];
        });
      } else this.toastr.error(response.error);
    });
  }

  increaseQuantity(cart: any) {
    const quantity = cart.quantity + 1;
    this.updateQuantity(cart.id, quantity);
  }

  decreaseQuantity(cart: any) {
    const quantity = cart.quantity - 1;
    this.updateQuantity(cart.id, quantity);
  }

  updateQuantity(cartId: number, quantity: number) {
    if (quantity == 0) {
      this.service.deleteCartItem(cartId).subscribe((response: any) => {
        if (response.status == 'success') {
          this.toastr.success('Product removed from cart');
          this.getCartItems();
        } else this.toastr.error(response.error);
      });
    } else {
      this.service
        .updateQuantity(cartId, quantity)
        .subscribe((response: any) => {
          if (response.status == 'success') {
            this.getCartItems();
          } else this.toastr.error(response.error);
        });
    }
  }

  placeOrder() {
    const modalRef = this.modalService.open(ChooseAddressComponent, {
      size: 'xl',
    });
    modalRef.result.finally(() => {
      this.getCartItems();
    });
  }
}
