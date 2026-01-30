import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AdminLayoutComponent } from './layout/layout.component';
//import { DashboardComponent } from './dashboard/dashboard.component';

export const adminRoutes: Routes = [
  { path: 'admin/login', component: LoginComponent },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    children: [
     // { path: '', component: DashboardComponent },
      // On ajoutera articles, events, partners ici après
    ]
  }
];
