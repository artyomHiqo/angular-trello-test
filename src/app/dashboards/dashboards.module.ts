import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { DashboardsRoutingModule } from './dashboards-routing.module';
import { DashboardsComponent } from './dashboards.component';

@NgModule({
  declarations: [
    DashboardsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    DashboardsRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class DashboardsModule { }
