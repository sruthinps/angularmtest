import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { dashboardRoutingComponents, DashboardRoutingModule } from './dashboard-routing.module';


@NgModule({
  declarations: [dashboardRoutingComponents],
  imports: [
    CommonModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
