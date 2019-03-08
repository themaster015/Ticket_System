import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './theme/admin/admin.component';
import { AuthGuard } from './shared/services/auth.guard';
import { AuthComponent } from './theme/auth/auth.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    canActivate: [ AuthGuard ],
    children: [
       { path: '', redirectTo: 'dashboard/default', pathMatch: 'full' },
       { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule' },
       { path: 'generales', loadChildren: './generales/generales.module#GeneralesModule' },
    ]
  },
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: 'login',
        loadChildren: './theme/login/login.module#LoginModule'
      },
    ]
  },
  { path: '**', redirectTo: 'dashboard/default', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
