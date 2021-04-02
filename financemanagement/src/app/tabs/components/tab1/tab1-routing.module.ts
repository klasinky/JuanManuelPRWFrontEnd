import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailmonthComponent } from './components/detailmonth/detailmonth.component';
import { Tab1Page } from './tab1.page';

const routes: Routes = [
  {
    path: '',
    component: Tab1Page,
    children: []
  },{
    path: 'details/:id',
    component: DetailmonthComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Tab1PageRoutingModule {}
