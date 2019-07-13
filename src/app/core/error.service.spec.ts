import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

import { ErrorService } from './error.service';

describe('UserService', () => {

  let service: ErrorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ErrorService,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(() => {
    service = TestBed.get(ErrorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('handleError return error', () => {
    const mockErrorEvent = new ErrorEvent('network error');
    const mockHttpErrorResponse = new HttpErrorResponse({error: mockErrorEvent});

    expect(service.handleError(mockHttpErrorResponse) instanceof Observable).toBeTruthy();
    expect(service.handleError(mockErrorEvent as any) instanceof Observable).toBeTruthy();
  });

});
