import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoggedInGuard } from 'src/app/guards/logged-in.guard';
import { AuthComponent } from './auth.component';


const routes: Routes = [
    { path: '', redirectTo: '/auth', pathMatch: 'full' },
    { path: 'auth', component: AuthComponent, canActivate: [LoggedInGuard],  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class AuthRoutingModule { }
