import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderRoutingModule } from './order-routing.module';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { OrderPreviewComponent } from './order-preview/order-preview.component';
import { ChooseAddressComponent } from './choose-address/choose-address.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    OrderHistoryComponent,
    OrderPreviewComponent,
    ChooseAddressComponent,
  ],
  imports: [CommonModule, OrderRoutingModule, FormsModule],
})
export class OrderModule {}
