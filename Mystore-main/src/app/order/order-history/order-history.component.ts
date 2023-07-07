import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { OrderPreviewComponent } from '../order-preview/order-preview.component';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css'],
})
export class OrderHistoryComponent {
  orders: any = [];
  order_details: any = [];

  constructor(
    private service: OrderService,
    private toastr: ToastrService,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.getOrders();
  }

  getOrders() {
    this.service.getOrders().subscribe((response: any) => {
      if (response.status == 'success') {
        this.orders = response.data;
        this.orders.map((order: any) => {
          order.createdOn = order.createdOn.split('T')[0];
        });
      } else this.toastr.error(response.error);
    });
  }

  onCancel(id: number) {
    this.service.cancelOrder(id).subscribe((response: any) => {
      if (response.status == 'success') {
        this.toastr.success('Order Cancelled !');
        this.getOrders();
      } else this.toastr.error(response.error);
    });
  }

  getOrderPreviewDetails(orderId: number) {
    this.service.getOrderPreviewDetails(orderId).subscribe((response: any) => {
      if (response.status == 'success') {
        this.order_details = response.data;
        this.showOrderDetails(this.order_details);
      } else {
        this.toastr.error(response.error);
      }
    });
  }

  showOrderDetails(order_details: any) {
    const modalRef = this.modalService.open(OrderPreviewComponent, {
      size: 'lg',
    });
    const component = modalRef.componentInstance as OrderPreviewComponent;
    component.order_details = order_details;
  }
}
