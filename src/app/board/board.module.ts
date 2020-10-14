import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardComponent } from './board.component';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { BoardRoutingModule } from './board-routing.module';
import { ColumnComponent } from './column/column.component';

@NgModule({
  declarations: [BoardComponent, ColumnComponent],
  imports: [
    CommonModule,
    SharedModule,
    BoardRoutingModule,
    SharedModule,
    FormsModule,
  ]
})
export class BoardModule { }
