import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { OrderPreviewComponent } from './order-preview/order-preview.component';

const routes: Routes = [
  { path: 'history', component: OrderHistoryComponent },
  { path: 'preview', component: OrderPreviewComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule { }
