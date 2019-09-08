import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed, async } from '@angular/core/testing';

import { GlobalErrorHandlerService } from './global-error-handler.service';
import { MatSnackBarModule, MatDialogModule } from '@angular/material';

describe('GlobalErrorHandlerService', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ],
      imports: [
        MatSnackBarModule,
        MatDialogModule,
      ],
      providers: [
        GlobalErrorHandlerService,
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
    })
    .compileComponents();
  }));

  afterAll(() => {
    TestBed.resetTestingModule();
  });

  it('should be created', () => {
    const service: GlobalErrorHandlerService = TestBed.get(GlobalErrorHandlerService);
    expect(service).toBeTruthy();
  });
});
