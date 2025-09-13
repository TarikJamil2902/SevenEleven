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

  
 
  // ✅ Wildcard -> home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
