import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoggedOffGuard } from 'src/app/guards/logged-off.guard';
import { ForumComponent } from './components/forum/forum.component';
import { PostDetailComponent } from './components/forum/post-detail/post-detail.component';
import { MonthDetailComponent } from './components/months/month-detail/month-detail.component';
import { MonthsComponent } from './components/months/months.component';
import { ProfileComponent } from './components/profile/profile.component';
import { StockDetailComponent } from './components/stocks/stock-detail/stock-detail.component';
import { StocksComponent } from './components/stocks/stocks.component';
import { MainComponent } from './main.component';

const routes: Routes = [
  {
    path: '', component: MainComponent, children:
      [
        { path: '',component: MonthsComponent },
        { path: 'months/detail/:id', component: MonthDetailComponent },
        { path: 'profile', component: ProfileComponent },
        { path: 'stocks', component: StocksComponent },
        { path: 'stocks/detail/:id', component: StockDetailComponent },
        { path: 'post', component: ForumComponent},
        { path: 'post/:id', component: PostDetailComponent}
      ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
