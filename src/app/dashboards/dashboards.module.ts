import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { DashboardsRoutingModule } from './dashboards-routing.module';
import { DashboardsComponent } from './dashboards.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    DashboardsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    DashboardsRoutingModule,
    ReactiveFormsModule,
  ]
})
export class DashboardsModule { }
