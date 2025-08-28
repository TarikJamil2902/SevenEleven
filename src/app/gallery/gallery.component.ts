import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ImageDialogComponent } from './image-dialog/image-dialog.component';

export interface GalleryImage {
  id: number;
  src: string;
  title: string;
  category: string;
  description?: string;
  date?: string;
}

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {
  activeCategory = 'all';
  categories = [
    { id: 'all', name: 'All' },
    { id: 'projects', name: 'Projects' },
    { id: 'products', name: 'Products' },
    { id: 'events', name: 'Events' },
    { id: 'team', name: 'Team' },
    { id: 'testimonials', name: 'Testimonials' }
  ];

  galleryImages: GalleryImage[] = [
    // Project Images
    {
      id: 1,
      src: 'assets/images/gallery/project1.jpg',
      title: 'Project Installation',
      category: 'projects',
      description: 'Ongoing project installation at client site',
      date: '2023-10-15'
    },
    {
      id: 2,
      src: 'assets/images/gallery/project2.jpg',
      title: 'Construction Site',
      category: 'projects',
      description: 'Construction progress at our latest site',
      date: '2023-09-28'
    },
    // Add more sample images...

    // Product Images
    {
      id: 3,
      src: 'assets/images/gallery/product1.jpg',
      title: 'Industrial Machine',
      category: 'products',
      description: 'Our latest industrial machine model',
      date: '2023-11-05'
    },
    // Add more sample images...
  ];

  filteredImages: GalleryImage[] = [];

  constructor(private dialog: MatDialog) {}

  ngOnInit() {
    this.filterImages('all');
  }

  filterImages(category: string) {
    this.activeCategory = category;
    if (category === 'all') {
      this.filteredImages = [...this.galleryImages];
    } else {
      this.filteredImages = this.galleryImages.filter(img => img.category === category);
    }
  }

  openImageDialog(image: GalleryImage) {
    this.dialog.open(ImageDialogComponent, {
      data: image,
      panelClass: 'image-dialog-container'
    });
  }
}
