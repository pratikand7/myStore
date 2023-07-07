import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthService } from './auth/auth.service';
import { HomePageComponent } from './home-page/home-page.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', redirectTo: '/home/home_page', pathMatch: 'full' },
  {
    path: 'home',
    component: HomeComponent,
    children: [
      {
        path: 'home_page',
        component: HomePageComponent,
      },
      {
        path: 'order',
        loadChildren: () =>
          import('./order/order.module').then((m) => m.OrderModule),
        canActivate: [AuthService],
      },
      {
        path: 'product',
        loadChildren: () =>
          import('./product/product.module').then((m) => m.ProductModule),
        canActivate: [AuthService],
      },
      {
        path: 'user',
        loadChildren: () =>
          import('./user/user.module').then((m) => m.UserModule),
        canActivate: [AuthService],
      },
    ],
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
