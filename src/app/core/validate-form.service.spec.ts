import { TestBed } from '@angular/core/testing';

import { ValidateFormService } from './validate-form.service';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

describe('UserService', () => {

  let service: ValidateFormService;

  /**
   * testbed configuration
   */
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ValidateFormService,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(() => {
    service = TestBed.get(ValidateFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  /**
   * when form have 0 errors, not return mesagge errorme
   */
  it('getError not return error', () => {
    expect(service.getError('', {})).toBe('');
    expect(service.getError('', { errors: {}})).toBe('');
  });

  it('getError return error required', () => {
    const mockField = {
      errors: {
        required: true,
      },
    };
    expect(service.getError('', mockField)).not.toBe('');
  });

  it('getError return error minlength', () => {
    const mockField = {
      errors: {
        minlength: {
          requiredLength: 5,
        },
      },
    };
    expect(service.getError('', mockField)).not.toBe('');
  });

  it('getError return error maxlength', () => {
    const mockField = {
      errors: {
        maxlength: {
          requiredLength: 5,
        },
      },
    };
    expect(service.getError('', mockField)).not.toBe('');
  });

  it('getError return error email', () => {
    const mockField = {
      errors: {
        email: true,
      },
    };
    expect(service.getError('', mockField)).not.toBe('');
  });

});
