import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { OrderDetailsComponent } from '../order-details/order-details.component';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css'],
})
export class OrderListComponent {
  orders = [];
  order_details = [];
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

  updateStatus(id: number, orderStatus: number) {
    this.service
      .updateOrderStatus(id, orderStatus)
      .subscribe((response: any) => {
        if (response.status == 'success') {
          this.getOrders();
          this.toastr.success('Order Status Changed !');
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
    const modalRef = this.modalService.open(OrderDetailsComponent, {
      size: 'lg',
    });
    const component = modalRef.componentInstance as OrderDetailsComponent;
    component.order_details = order_details;
  }
}
