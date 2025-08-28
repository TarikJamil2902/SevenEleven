import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Layout & Website pages
import { LayoutComponent } from './layout/layout.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { ProjectsComponent } from './projects/projects.component';
import { ServicesComponent } from './services/services.component';

// Pipes
import { SafePipe } from './shared/pipes/safe.pipe';

// Navbar & Footer
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GalleryComponent } from './gallery/gallery.component';
import { ImageDialogComponent } from './gallery/image-dialog/image-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ProductsModule } from './products/products.module';

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
    AppRoutingModule, // Make sure AppRoutingModule is imported before ProductsModule
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatDialogModule
    // Remove ProductsModule from here since we're using lazy loading
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
