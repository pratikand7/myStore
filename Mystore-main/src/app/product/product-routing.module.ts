import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { GallaryComponent } from './gallary/gallary.component';
import { ProductInfoComponent } from './product-info/product-info.component';

const routes: Routes = [
  { path: 'cart', component: CartComponent },
  { path: 'gallary', component: GallaryComponent },
  { path: 'product-info', component: ProductInfoComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductRoutingModule {}
