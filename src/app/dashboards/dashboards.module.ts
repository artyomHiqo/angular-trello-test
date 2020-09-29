import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

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
    DashboardsRoutingModule
  ]
})
export class DashboardsModule { }
