import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';

const material = [
  MatToolbarModule,
  MatIconModule,
  MatMenuModule,
  MatButtonModule,
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
