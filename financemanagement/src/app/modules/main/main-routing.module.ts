import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoggedOffGuard } from 'src/app/guards/logged-off.guard';
import { MonthDetailComponent } from './components/months/month-detail/month-detail.component';
import { MonthsComponent } from './components/months/months.component';
import { MainComponent } from './main.component';

const routes: Routes = [
{
  path:'', component: MainComponent, children: [{
    path: '',
    component: MonthsComponent
  },
  {path : 'months/detail/:id', component : MonthDetailComponent}
]
},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
