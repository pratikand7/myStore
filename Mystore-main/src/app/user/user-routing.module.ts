import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddressAddComponent } from './address-add/address-add.component';
import { AddressEditComponent } from './address-edit/address-edit.component';
import { AddressListComponent } from './address-list/address-list.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  { path: 'address-add', component: AddressAddComponent },
  { path: 'address-edit', component: AddressEditComponent },
  { path: 'address-list', component: AddressListComponent },
  { path: 'profile', component: ProfileComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
