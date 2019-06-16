import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileDetailComponent } from './profile-detail/profile-detail.component';
import { ProfileFormComponent } from './profile-form/profile-form.component';

@NgModule({
  declarations: [
    ProfileDetailComponent,
    ProfileFormComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ProfileModule { }
