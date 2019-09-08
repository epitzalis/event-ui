import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { ErrorDialogComponent } from '../shared/error-dialog/error-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {

  constructor(
    public snackBar: MatSnackBar,
    public matDialog: MatDialog,
  ) {}

  public showSuccess(message: string): void {
    const config = new MatSnackBarConfig();
    config.duration = 5000;
    this.snackBar.open(message, null, config);
  }

  public showError(title: string, message: string): void {
    this.matDialog.open(ErrorDialogComponent, {
      data: {
        title,
        message
      },
    });
  }
}
