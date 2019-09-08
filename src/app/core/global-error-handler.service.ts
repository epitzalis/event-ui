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
        } else {
          this.notificationService.showError(`${error.status}`, error.message);
        }
      } else {
        this.notificationService.showError('Unexpected error', error.message);
      }
    });
  }

}
