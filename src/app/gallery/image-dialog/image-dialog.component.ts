import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { GalleryImage } from '../gallery.component';

@Component({
  selector: 'app-image-dialog',
  providers: [DatePipe],
  template: `
    <div class="image-dialog">
      <div class="image-container">
        <img [src]="data.src" [alt]="data.title" class="dialog-image">
      </div>
      <div class="dialog-content">
        <h2 class="dialog-title">{{ data.title }}</h2>
        <p class="dialog-description" *ngIf="data.description">{{ data.description }}</p>
        <div class="dialog-meta" *ngIf="data.date">
          <span class="date">{{ formatDate(data.date) }}</span>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .image-dialog {
      max-width: 800px;
      max-height: 90vh;
      display: flex;
      flex-direction: column;
    }
    
    .image-container {
      overflow: hidden;
      max-height: 70vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #f5f5f5;
    }
    
    .dialog-image {
      max-width: 100%;
      max-height: 70vh;
      object-fit: contain;
    }
    
    .dialog-content {
      padding: 20px;
      background: white;
    }
    
    .dialog-title {
      margin: 0 0 10px;
      color: #333;
    }
    
    .dialog-description {
      margin: 0 0 10px;
      color: #666;
      line-height: 1.5;
    }
    
    .dialog-meta {
      font-size: 0.9em;
      color: #888;
    }
  `]
})
export class ImageDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: GalleryImage,
    private datePipe: DatePipe
  ) {}

  formatDate(dateString: string | undefined): string {
    if (!dateString) return '';
    return this.datePipe.transform(dateString, 'mediumDate') || '';
  }
}
