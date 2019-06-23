import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileDetailComponent } from './profile-detail/profile-detail.component';
import { ProfileFormComponent } from './profile-form/profile-form.component';

// Modules
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    ProfileDetailComponent,
    ProfileFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
  ]
})
export class ProfileModule { }
