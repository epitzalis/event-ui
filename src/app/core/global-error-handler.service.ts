import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable, Injector, NgZone } from '@angular/core';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root',
})

export class GlobalErrorHandlerService implements ErrorHandler {

  constructor(
    private readonly notificationService: NotificationService,
    private readonly ngZone: NgZone,
  ) { }

    // This method has been commented on purpose. Don't remove comments!
  public handleError(error: Error | HttpErrorResponse) {
    this.ngZone.run(() => {
      // Intercepted by ServerErrorsInterceptorService and sent here
      if (error instanceof HttpErrorResponse) {
        if (!navigator.onLine) {
          // Handle offline error
          this.notificationService.showError('Communication error', 'No Internet Connection');
        } else if (error.status >= 400 && error.status < 500) {
          this.notificationService.showError('Error doing a request to the server',
                                              'The request contains bad syntax or cannot be fulfilled.');
        } else if (error.status >= 500) {
          this.notificationService.showError('Error in the response of the server',
                                              'The server failed to fulfill an apparently valid request');
        } else {
          this.notificationService.showError(error.statusText,
                                              'An error has occurred trying to communicate with server.');
        }
      } else {
        this.notificationService.showError(error.name, error.message);
      }
    });
  }

}
