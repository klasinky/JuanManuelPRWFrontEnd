import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoggedOffGuard } from 'src/app/guards/logged-off.guard';
import { MonthsComponent } from './components/months/months.component';
import { MainComponent } from './main.component';

const routes: Routes = [
{
  path:'', component: MainComponent, children: [{
    path: '',
    component: MonthsComponent
  }]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
