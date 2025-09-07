import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

type ProductCategory = 'Mechanical' | 'Technical' | 'Electrical';

export interface GalleryImage {
  id: number;
  src: string;
  title: string;
  category: ProductCategory;
  description: string;
  model: string;
  specifications: Array<{ key: string; value: string }>;
  features: string[];
  price: number | 'Price on Request';
  whatsappNumber: string;
}

export interface DialogData extends GalleryImage {
  // No need to modify the specifications type here as we'll use the array directly
}

@Component({
  selector: 'app-image-dialog',
  templateUrl: './image-dialog.component.html',
  styleUrls: ['./image-dialog.component.css']
})
export class ImageDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {}
  
  getWhatsAppLink(): string {
    const message = `Hi, I'm interested in ${this.data.title} (${this.data.model}). Could you please provide more details?`;
    return `https://wa.me/${this.data.whatsappNumber}?text=${encodeURIComponent(message)}`;
  }
  
  formatPrice(price: number | 'Price on Request'): string {
    if (price === 'Price on Request') return 'Price on Request';
    return `$${price.toLocaleString()}`;
  }
}
