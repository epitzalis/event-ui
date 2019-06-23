import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupFormComponent } from './signup-form/signup-form.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    SignupFormComponent,
    LoginFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
  ]
})
export class LoginModule { }
