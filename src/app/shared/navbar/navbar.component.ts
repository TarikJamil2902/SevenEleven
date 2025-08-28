// navbar.component.ts
import { Component, HostListener, OnInit, Renderer2, ElementRef } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

type Theme = 'light' | 'dark';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  menuActive = false;
  scrolled = false;
  activeRoute = '';
  currentTheme: Theme = 'light';

  constructor(
    private router: Router,
    private renderer: Renderer2,
    private el: ElementRef
  ) {}

  ngOnInit() {
    // Check for saved theme preference or use system preference
    const savedTheme = localStorage.getItem('theme') as Theme;
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    this.currentTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
    this.applyTheme(this.currentTheme);

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.activeRoute = event.url.split('?')[0];
        // Close mobile menu when route changes
        this.menuActive = false;
      }
    });
  }

  toggleTheme() {
    this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
    this.applyTheme(this.currentTheme);
    // Save preference
    localStorage.setItem('theme', this.currentTheme);
  }

  private applyTheme(theme: Theme) {
    const body = document.body;
    if (theme === 'dark') {
      body.classList.add('dark-theme');
    } else {
      body.classList.remove('dark-theme');
    }
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const navbar = this.el.nativeElement.querySelector('.navbar');
    if (window.pageYOffset > 50) {
      this.renderer.addClass(navbar, 'scrolled');
      this.scrolled = true;
    } else {
      this.renderer.removeClass(navbar, 'scrolled');
      this.scrolled = false;
    }
  }

  toggleMenu() {
    this.menuActive = !this.menuActive;
    this.updateBodyScroll();
  }

  closeMenu() {
    this.menuActive = false;
    this.updateBodyScroll();
  }

  private updateBodyScroll() {
    if (this.menuActive) {
      this.renderer.addClass(document.body, 'no-scroll');
    } else {
      this.renderer.removeClass(document.body, 'no-scroll');
    }
  }

  isActive(route: string): boolean {
    return this.activeRoute === route;
  }
}
