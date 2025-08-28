import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WebsiteRoutingModule } from './website-routing.module';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ProjectsComponent } from './projects/projects.component';
import { ServicesComponent } from './services/services.component';
import { ContactComponent } from './contact/contact.component';
import { ProductsComponent } from './products/products.component';
import { LayoutComponent } from './layout/layout.component';


@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    AboutComponent,
    ProjectsComponent,
    ServicesComponent,
    ContactComponent,
    ProductsComponent,
    LayoutComponent
  ],
  imports: [
    CommonModule,
    WebsiteRoutingModule
  ]
})
export class WebsiteModule { }
