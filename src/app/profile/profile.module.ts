import { ProfileDetailComponent } from './profile-detail/profile-detail.component';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: ProfileDetailComponent
  }
];

@NgModule({
  declarations: [
    ProfileDetailComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
  ]
})
/**
 * Module for Profile
 */
export class ProfileModule { }
