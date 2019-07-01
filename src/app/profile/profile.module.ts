import { Routes } from '@angular/router';
import { ProfileDetailComponent } from './profile-detail/profile-detail.component';
import { ProfileFormComponent } from './profile-form/profile-form.component';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Modules
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: ProfileDetailComponent
  }
];

@NgModule({
  declarations: [
    ProfileDetailComponent,
    ProfileFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
  ]
})
export class ProfileModule { }
