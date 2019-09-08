import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

/**
 * Services
 */
import { EventService } from './event.service';
import { UserService } from './user.service';
import { ImagesService } from './images.service';
import { ValidateFormService } from './validate-form.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
  ],
  providers: [
    EventService,
    UserService,
    ImagesService,
    ValidateFormService
  ],
})
/**
 * Module for core sevices
 */
export class CoreModule {}
