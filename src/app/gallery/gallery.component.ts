import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
  }

  // Handle image loading errors
  handleImageError(event: Event): void {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = 'assets/images/placeholder.svg';
    imgElement.alt = 'Image not available';
  }

  // Format project names for display
  getProjectName(filename: string): string {
    // Remove file extension and replace hyphens with spaces
    const nameWithoutExt = filename.split('.')[0];
    return nameWithoutExt
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
}
