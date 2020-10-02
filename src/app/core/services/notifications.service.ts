import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { reduce } from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  constructor(private snackBar: MatSnackBar) { }

  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }
}
