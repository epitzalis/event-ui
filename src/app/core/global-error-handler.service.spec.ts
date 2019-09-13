import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { TestBed, async } from '@angular/core/testing';
import { MatSnackBarModule, MatDialogModule } from '@angular/material';
import { GlobalErrorHandlerService } from './global-error-handler.service';
import { NotificationService } from './notification.service';

describe('GlobalErrorHandlerService', () => {

  let service: GlobalErrorHandlerService;

  /**
   * testbed configuration
   */
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ],
      imports: [
        MatSnackBarModule,
        MatDialogModule,
      ],
      providers: [
        NotificationService,
        GlobalErrorHandlerService,
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
    })
    .compileComponents();
  }));

  afterAll(() => {
    TestBed.resetTestingModule();
  });

  beforeEach(() => {
    service = TestBed.get(GlobalErrorHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('execute handleError when error is not of type HttpErrorResponse', () => {
    const notificationService = TestBed.get(NotificationService);
    const spy = spyOn(notificationService, 'showError').and.callFake( () => {});
    const error = { name: 'name', message: 'message' };
    service.handleError(error);
    expect(spy).toHaveBeenCalled();
  });

  it('execute handleError when navigator.onLine is true', () => {
    spyOnProperty(navigator, 'onLine').and.returnValue(true);
    const notificationService = TestBed.get(NotificationService);
    const spy = spyOn(notificationService, 'showError').and.callFake( () => {});
    const error = new HttpErrorResponse({});
    service.handleError(error);
    expect(spy).toHaveBeenCalled();
  });

  it('execute handleError when navigator.onLine is true', () => {
    spyOnProperty(navigator, 'onLine').and.returnValue(false);
    const notificationService = TestBed.get(NotificationService);
    const spy = spyOn(notificationService, 'showError').and.callFake( () => {});
    const error = new HttpErrorResponse({});
    service.handleError(error);
    expect(spy).toHaveBeenCalled();
  });

  /**
   * errors that have status
   */
  it('execute handleError when error have a status', () => {
    spyOnProperty(navigator, 'onLine').and.returnValue(true);
    const notificationService = TestBed.get(NotificationService);
    const spy = spyOn(notificationService, 'showError').and.callFake( () => {});

    const error1 = new HttpErrorResponse({});
    service.handleError(error1);

    const error2 = new HttpErrorResponse({ status: 400 });
    service.handleError(error2);

    const error3 = new HttpErrorResponse({ status: 500 });
    service.handleError(error3);

    expect(spy).toHaveBeenCalled();
  });

});
