import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
import { LayoutComponent } from './layout/layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
        data: { title: 'Dashboard' }
      },
      // Add other admin routes here as children
      // {
      //   path: 'users',
      //   component: UsersComponent,
      //   data: { title: 'User Management' }
      // },
      // {
      //   path: 'products',
      //   component: ProductsComponent,
      //   data: { title: 'Products' }
      // },
      // {
      //   path: 'orders',
      //   component: OrdersComponent,
      //   data: { title: 'Orders' }
      // },
      // {
      //   path: 'settings',
      //   component: SettingsComponent,
      //   data: { title: 'Settings' }
      // }
    ]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '**',
    redirectTo: 'dashboard'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
