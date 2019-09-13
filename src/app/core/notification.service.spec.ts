import { TestBed, async } from '@angular/core/testing';

import { NotificationService } from './notification.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';

describe('NotificationService', () => {

  let service: NotificationService;

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

  beforeEach(() => {
    service = TestBed.get(NotificationService);
  });

  afterAll(() => {
    TestBed.resetTestingModule();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('execute showSuccess and open snackBar', () => {
    const spy = spyOn(service.snackBar, 'open');
    service.showSuccess('message');
    expect(spy).toHaveBeenCalled();
  });

  it('execute showError and open matDialog', () => {
    const spy = spyOn(service.matDialog, 'open');
    service.showError('title', 'message');
    expect(spy).toHaveBeenCalled();
  });

});
