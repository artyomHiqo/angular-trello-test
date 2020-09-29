import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardsComponent } from './dashboards.component';

export const dashboardsRoutes: Routes = [
  {
    path: '',
    component: DashboardsComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(dashboardsRoutes)
  ],
  exports: [RouterModule]
})
export class DashboardsRoutingModule { }
