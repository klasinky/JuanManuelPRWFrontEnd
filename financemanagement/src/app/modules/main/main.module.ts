import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { MonthsComponent } from './components/months/months.component';
import { ListDetailComponent } from './components/months/list-detail/list-detail.component';
import { OverViewComponent } from './components/months/over-view/over-view.component';


@NgModule({
  declarations: [
    MainComponent,
    MonthsComponent,
    ListDetailComponent,
    OverViewComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
  ]
})
export class MainModule { }
