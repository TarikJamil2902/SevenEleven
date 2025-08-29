import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Website pages import
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { ProjectsComponent } from './projects/projects.component';
import { ServicesComponent } from './services/services.component';
import { LayoutComponent } from './layout/layout.component';
import { GalleryComponent } from './gallery/gallery.component';
import { LoginComponent } from './admin/login/login.component'; // ✅ Login import root e

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'about', component: AboutComponent },
      { path: 'contact', component: ContactComponent },
      { 
        path: 'products', 
        loadChildren: () => import('./products/products.module').then(m => m.ProductsModule) 
      },
      { path: 'projects', component: ProjectsComponent },
      { path: 'services', component: ServicesComponent },
      { path: 'gallery', component: GalleryComponent },
    ]
  },

  // Login route at root level
  { 
    path: 'login', 
    component: LoginComponent,
    data: { title: 'Admin Login' }
  },

  // Lazy load admin routes
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  },

  // ✅ Wildcard -> home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
