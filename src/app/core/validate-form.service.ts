import { Injectable } from '@angular/core';

@Injectable()
export class ValidateFormService {
  constructor() {}

  getError(name: string, field: any): string {
    if (field.errors) {
      if (field.errors.required) {
        return `${name} is required`;
      } else if (field.errors.minlength) {
        return `${name} min length is ${field.errors.minlength.requiredLength}`;
      } else if (field.errors.maxlength) {
        return `${name} max length is ${field.errors.maxlength.requiredLength}`;
      } else if (field.errors.email) {
        return `${name} isn't a valid email`;
      }
    }
    return '';
  }

}
