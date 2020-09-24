import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './material/material.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    MaterialModule,
  ],
  exports: [
    MaterialModule,
  ]
})
export class SharedModule { }
