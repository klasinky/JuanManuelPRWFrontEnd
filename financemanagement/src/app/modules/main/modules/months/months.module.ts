import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MonthsRoutingModule } from './months-routing.module';
import { MonthsComponent } from './months.component';
import { ListDetailComponent } from './components/list-detail/list-detail.component';
import { OverViewComponent } from './components/over-view/over-view.component';


@NgModule({
  declarations: [
    MonthsComponent,
    ListDetailComponent,
    OverViewComponent
  ],
  imports: [
    CommonModule,
    MonthsRoutingModule
  ]
})
export class MonthsModule { }
