import { NgModule } from '@angular/core';

/**
 * Angular material
 */
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';

import 'hammerjs';
import { ErrorDialogComponent } from './error-dialog/error-dialog.component';
import { MatSnackBarModule } from '@angular/material';

@NgModule({
  declarations: [ErrorDialogComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatListModule,
    MatCardModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    RouterModule,
    MatSlideToggleModule,
    MatCheckboxModule,
    MatDialogModule,
    MatSnackBarModule,
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatListModule,
    MatCardModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    RouterModule,
    MatSlideToggleModule,
    MatCheckboxModule,
    MatDialogModule,
    MatSnackBarModule,
  ],
  entryComponents: [ErrorDialogComponent],
})

/**
 * shared module contains component by angular material
 */
export class SharedModule { }
