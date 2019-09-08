import { TestBed, async } from '@angular/core/testing';

import { NotificationService } from './notification.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';

describe('NotificationService', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ],
      imports: [
        HttpClientTestingModule,
        MatSnackBarModule,
        MatDialogModule,
      ],
      providers: [
        NotificationService,
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} },
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
    })
    .compileComponents();
  }));

  afterAll(() => {
    TestBed.resetTestingModule();
  });

  it('should be created', () => {
    const service: NotificationService = TestBed.get(NotificationService);
    expect(service).toBeTruthy();
  });
});
