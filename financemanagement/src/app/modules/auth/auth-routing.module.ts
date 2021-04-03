import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
    { path: '', redirectTo: '/auth', pathMatch: 'full' },
    { path: 'auth', component: AuthComponent },
];

export const yourRouting = RouterModule.forChild(routes);

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class AuthRoutingModule { }
