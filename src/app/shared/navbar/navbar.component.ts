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
export class NavbarComponent implements OnInit, OnDestroy {
  // Scroll detection
  scrolled = false;
  
  // Menu toggle (mobile)
  isMenuCollapsed = true;
  
  // Theme management
  currentTheme: Theme = 'light';
  private isBrowser: boolean;
  isMobile = false;
  private scrollListener: (() => void) | null = null;
  private resizeListener: (() => void) | null = null;
  private themeChangeListener: ((event: MediaQueryListEvent) => void) | null = null;

  constructor(
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      this.initializeTheme();
      this.setupEventListeners();
      this.setupRouteChangeListener();
    }
  }

  private initializeTheme(): void {
    const savedTheme = localStorage.getItem('theme') as Theme;
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    this.currentTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
    this.applyTheme(this.currentTheme);
  }

  private setupEventListeners(): void {
    // Theme change listener
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    this.themeChangeListener = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem('theme')) {
        this.currentTheme = e.matches ? 'dark' : 'light';
        this.applyTheme(this.currentTheme);
      }
    };
    mediaQuery.addEventListener('change', this.themeChangeListener);

    // Window resize listener
    this.resizeListener = () => this.checkIfMobile();
    window.addEventListener('resize', this.resizeListener);
    this.checkIfMobile();

    // Click outside menu listener
    this.scrollListener = this.renderer.listen('document', 'click', (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const menu = document.querySelector('.nav-links');
      const toggle = document.querySelector('.menu-toggle');
      
      if (menu && !menu.contains(target) && toggle && !toggle.contains(target) && !this.isMenuCollapsed) {
        this.closeMenu();
      }
    });
  }

  private setupRouteChangeListener(): void {
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.closeMenu();
    });
  }

  private applyTheme(theme: Theme): void {
    if (theme === 'dark') {
      this.renderer.addClass(this.document.body, 'dark-theme');
    } else {
      this.renderer.removeClass(this.document.body, 'dark-theme');
    }
  }

  toggleMenu(): void {
    this.isMenuCollapsed = !this.isMenuCollapsed;
    document.body.style.overflow = this.isMenuCollapsed ? '' : 'hidden';
  }
  
  closeMenu(): void {
    if (!this.isMenuCollapsed) {
      this.isMenuCollapsed = true;
      document.body.style.overflow = '';
    }
  }

  private checkIfMobile(): void {
    if (this.isBrowser) {
      const wasMobile = this.isMobile;
      this.isMobile = window.innerWidth < 992; // Bootstrap's lg breakpoint
      
      // Close menu when resizing from mobile to desktop
      if (wasMobile && !this.isMobile) {
        this.closeMenu();
      }
    }
  }
  
  @HostListener('window:scroll')
  onWindowScroll(): void {
    if (this.isBrowser) {
      this.scrolled = window.scrollY > 50;
    }
  }

  ngOnDestroy(): void {
    // Clean up event listeners
    if (this.scrollListener) {
      this.scrollListener();
    }
    if (this.resizeListener) {
      window.removeEventListener('resize', this.resizeListener);
    }
    if (this.themeChangeListener) {
      window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', this.themeChangeListener);
    }
    document.body.style.overflow = '';
  }

  isActive(route: string): boolean {
    return this.router.url === route;
  }

  toggleTheme(): void {
    this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
    this.applyTheme(this.currentTheme);
    
    if (this.isBrowser) {
      localStorage.setItem('theme', this.currentTheme);
    }
  }

}
