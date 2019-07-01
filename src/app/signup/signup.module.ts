import { Routes } from '@angular/router';
import { SignupFormComponent } from './signup-form/signup-form.component';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: SignupFormComponent
  }
];

@NgModule({
  declarations: [
    SignupFormComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
  ]
})
export class SignupModule { }
