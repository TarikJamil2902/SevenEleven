import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { ResponsiveImageComponent } from './components/responsive-image/responsive-image.component';

const materialModules = [
  MatMenuModule,
  MatIconModule,
  MatButtonModule,
  MatCardModule,
  MatTableModule,
  MatToolbarModule,
  MatDialogModule,
  MatSidenavModule,
  MatListModule
];

@NgModule({
  declarations: [
    ResponsiveImageComponent
  ],
  imports: [
    CommonModule,
    ...materialModules
  ],
  exports: [
    ...materialModules
  ]
})
export class MaterialModule { }
