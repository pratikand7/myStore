import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductRoutingModule } from './product-routing.module';
import { GallaryComponent } from './gallary/gallary.component';
import { CartComponent } from './cart/cart.component';
import { ProductInfoComponent } from './product-info/product-info.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [GallaryComponent, CartComponent, ProductInfoComponent],
  imports: [CommonModule, ProductRoutingModule, FormsModule, NgbModule],
})
export class ProductModule {}
