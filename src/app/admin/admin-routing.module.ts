import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
import { LayoutComponent } from './layout/layout.component';
import { ProductComponent } from './components/product/product.component';

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
      {
        path: 'products',
        component: ProductComponent,
        data: { title: 'Products' }
      }
    ]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '**',
    redirectTo: 'dashboard'
  },
  {
    path: 'products',
    component: ProductComponent,
    data: { title: 'Products' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
