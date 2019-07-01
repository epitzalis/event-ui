import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupFormComponent } from './signup-form/signup-form.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    SignupFormComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
  ]
})
export class SignupModule { }
