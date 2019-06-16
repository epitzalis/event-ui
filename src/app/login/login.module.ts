import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SigninFormComponent } from './signin-form/signin-form.component';
import { LoginFormComponent } from './login-form/login-form.component';

@NgModule({
  declarations: [
    SigninFormComponent,
    LoginFormComponent
  ],
  imports: [
    CommonModule
  ]
})
export class LoginModule { }
