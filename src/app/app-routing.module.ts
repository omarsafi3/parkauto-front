import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthLoginGuard } from './login/services/auth-login.guard';
import { AuthDashboardGuard } from './login/services/auth-dashboard.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [AuthLoginGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthDashboardGuard] },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' }, // Default route
  { path: '**', redirectTo: '/dashboard' }, // Wildcard route for undefined paths
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
