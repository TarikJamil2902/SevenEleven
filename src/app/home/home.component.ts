import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  private slides: HTMLCollectionOf<Element> = document.getElementsByClassName('slides');
  private dots: HTMLCollectionOf<Element> = document.getElementsByClassName('dot');
  slideIndex = 0; // Made public for template binding
  private slideInterval: any;
  private readonly slideDuration = 5000; // 5 seconds

  ngOnInit() {
    this.initCarousel();
    this.startAutoSlide();
  }

  ngOnDestroy() {
    this.stopAutoSlide();
  }

  @HostListener('window:resize')
  onResize() {
    // Reinitialize carousel on window resize to handle responsive adjustments
    this.initCarousel();
  }

  private initCarousel() {
    // Show the first slide if slides exist
    if (this.slides?.length > 0) {
      this.showSlide(0);
    }
  }

  private showSlide(index: number) {
    // Reset all slides and dots
    for (let i = 0; i < this.slides.length; i++) {
      this.slides[i]?.classList?.remove('active');
      this.dots[i]?.classList?.remove('active');
    }

    // Show the selected slide and update dot
    const targetSlide = this.slides[index];
    const targetDot = this.dots[index];
    
    if (targetSlide && targetDot) {
      targetSlide.classList.add('active');
      targetDot.classList.add('active');
      this.slideIndex = index;
    }
  }

  currentSlide(n: number) {
    this.showSlide(n - 1);
    this.restartAutoSlide();
  }

  nextSlide() {
    const newIndex = (this.slideIndex + 1) % this.slides.length;
    this.showSlide(newIndex);
    this.restartAutoSlide();
  }

  prevSlide() {
    const newIndex = (this.slideIndex - 1 + this.slides.length) % this.slides.length;
    this.showSlide(newIndex);
    this.restartAutoSlide();
  }

  private startAutoSlide() {
    this.stopAutoSlide();
    this.slideInterval = setInterval(() => {
      this.nextSlide();
    }, this.slideDuration);
  }

  private stopAutoSlide() {
    if (this.slideInterval) {
      clearInterval(this.slideInterval);
    }
  }

  private restartAutoSlide() {
    this.stopAutoSlide();
    this.startAutoSlide();
  }
}
