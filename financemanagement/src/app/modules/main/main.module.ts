import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { MonthsComponent } from './components/months/months.component';
import { ListDetailComponent } from './components/months/list-detail/list-detail.component';
import { OverViewComponent } from './components/months/over-view/over-view.component';
import { MomentModule } from 'ngx-moment';
import { SidebarComponent } from 'src/app/components/sidebar/sidebar.component';
import { BotonCrearComponent } from './components/months/boton-crear/boton-crear.component';
import { MonthDetailComponent } from './components/months/month-detail/month-detail.component';
import { AddAmountBaseComponent } from './components/months/add-amount-base/add-amount-base.component';
import { ChartMonthComponent } from './components/months/chart-month/chart-month.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { CategoryDetailComponent } from './components/months/category-detail/category-detail.component';
import { ChartDifferenceComponent } from './components/months/chart-difference/chart-difference.component';

@NgModule({
  declarations: [
    MainComponent,
    MonthsComponent,
    ListDetailComponent,
    OverViewComponent,
    SidebarComponent,
    BotonCrearComponent,
    MonthDetailComponent,
    AddAmountBaseComponent,
    ChartMonthComponent,
    CategoryDetailComponent,
    ChartDifferenceComponent,
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    MomentModule,
    FormsModule,
    ReactiveFormsModule,
    NgxChartsModule,
  ]
})
export class MainModule { }
