import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AuthService } from './auth.service';

@NgModule({
  declarations: [LoginComponent, SignupComponent],
  imports: [CommonModule, AuthRoutingModule, FormsModule],
  providers: [AuthService],
})
export class AuthModule {}
