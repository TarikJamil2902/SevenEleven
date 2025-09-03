import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';

// Material Module
import { MaterialModule } from './shared/material.module';

// Angular Material Modules
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';

// Layout & Website pages
import { LayoutComponent } from './layout/layout.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { ProjectsComponent } from './projects/projects.component';
import { ServicesComponent } from './services/services.component';

// Pipes
import { SafePipe } from './shared/pipes/safe.pipe';
import { TitleCasePipe } from '@angular/common';

// Navbar & Footer
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { GalleryComponent } from './gallery/gallery.component';
import { ImageDialogComponent } from './gallery/image-dialog/image-dialog.component';
import { RouterModule } from '@angular/router';
import { ProductComponent } from './admin/components/product/product.component';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    HomeComponent,
    AboutComponent,
    ContactComponent,
    ProjectsComponent,
    ServicesComponent,
    NavbarComponent,
    SafePipe,
    FooterComponent,
    GalleryComponent,
    ImageDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    RouterModule,
    // Angular Material Modules
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatDialogModule,
    FormsModule,
    MaterialModule,
    
    // Remove ProductsModule from here since we're using lazy loading
  ],
  providers: [
    TitleCasePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
