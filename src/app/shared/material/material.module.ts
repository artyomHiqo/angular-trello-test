import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

const material = [
  MatToolbarModule,
  MatIconModule,
  MatMenuModule,
  MatButtonModule,
  MatProgressSpinnerModule,
  MatSnackBarModule,
  MatCardModule,
  MatGridListModule,
  MatFormFieldModule,
  MatInputModule,
];

@NgModule({
  imports: [
    material,
  ],
  exports: [
    material,
  ],
})
export class MaterialModule { }
