import { Component, HostListener, OnInit, OnDestroy, Renderer2, Inject, PLATFORM_ID } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { filter } from 'rxjs/operators';

type Theme = 'light' | 'dark';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  host: {
    '[class.dark-theme]': 'currentTheme === "dark"'
  }
})
export class NavbarComponent implements OnInit {
  // Scroll detection
  scrolled = false;

  // Menu toggle (mobile)
  menuActive = false;

  // Theme management
  currentTheme: Theme = 'light';
  private isBrowser: boolean;
  isMobile = false;

  constructor(
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.checkIfMobile();
    window.addEventListener('resize', () => this.checkIfMobile());
  }

  ngOnInit(): void {
    // Initialize theme from localStorage or system preference
    if (this.isBrowser) {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) {
        this.currentTheme = savedTheme as Theme;
      } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        this.currentTheme = 'dark';
      }
      this.applyTheme(this.currentTheme);

      // Listen for theme changes
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        if (!localStorage.getItem('theme')) {
          this.currentTheme = e.matches ? 'dark' : 'light';
          this.applyTheme(this.currentTheme);
        }
      });
    }

    // Handle scroll event
    if (this.isBrowser) {
      window.addEventListener('scroll', this.onWindowScroll);
    }
    
    // Close menu on route change
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.closeMenu();
    });
  }

  // Initialize theme
  private initializeTheme() {
    if (!this.isBrowser) return;

    const savedTheme = localStorage.getItem('theme') as Theme;
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    this.currentTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
    this.applyTheme(this.currentTheme);
  }

  // Apply theme to the document
  private applyTheme(theme: Theme) {
    if (theme === 'dark') {
      this.renderer.addClass(this.document.body, 'dark-theme');
    } else {
      this.renderer.removeClass(this.document.body, 'dark-theme');
    }
  }

  // Toggle mobile menu
  toggleMenu() {
    this.menuActive = !this.menuActive;
    this.updateBodyScroll();
  }

  // Close mobile menu
  closeMenu() {
    this.menuActive = false;
    this.updateBodyScroll();
  }

  // Update body scroll based on menu state
  private updateBodyScroll() {
    if (this.menuActive) {
      this.renderer.addClass(this.document.body, 'no-scroll');
    } else {
      this.renderer.removeClass(this.document.body, 'no-scroll');
    }
  }

  // Check if route is active
  isActive(route: string): boolean {
    return this.router.url === route;
  }

  // Toggle between light and dark theme
  toggleTheme() {
    this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
    this.applyTheme(this.currentTheme);
    
    // Save preference
    if (this.isBrowser) {
      localStorage.setItem('theme', this.currentTheme);
    }
  }

  // Handle window scroll for navbar effects
  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (!this.isBrowser) return;
    this.scrolled = window.scrollY > 50;
  }

  // Check if the screen is mobile size
  private checkIfMobile() {
    if (this.isBrowser) {
      this.isMobile = window.innerWidth < 992; // Bootstrap's lg breakpoint
    }
  }
}
