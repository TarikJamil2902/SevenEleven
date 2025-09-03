import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../shared/material.module';

import { AdminRoutingModule } from './admin-routing.module';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LayoutComponent } from './layout/layout.component';
import { AuthGuard } from './auth.guard';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { ProductComponent } from './components/product/product.component';

@NgModule({
  declarations: [
    LoginComponent,
    DashboardComponent,
    LayoutComponent,
    SidebarComponent,
    ProductComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  providers: [
    AuthGuard,
    CurrencyPipe
  ]
})
export class AdminModule { }
