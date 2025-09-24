import { Component, HostListener, OnInit, OnDestroy, Renderer2, Inject, PLATFORM_ID, ElementRef, ViewChild } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { filter, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

type Theme = 'light' | 'dark';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  host: {
    '[class.dark-theme]': 'currentTheme === "dark"',
    '[class.mobile-menu-open]': 'menuActive'
  }
})
export class NavbarComponent implements OnInit, OnDestroy {
  // State
  scrolled = false;          // Scroll detection
  menuActive = false;        // Mobile menu toggle
  currentTheme: Theme = 'light';
  isMobile = false;          // Screen size check
  private isBrowser: boolean;
  private destroy$ = new Subject<void>();

  @ViewChild('navbarToggler', { static: true }) navbarToggler!: ElementRef<HTMLButtonElement>;

  constructor(
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router,
    private el: ElementRef
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.checkIfMobile();
  }

  ngOnInit(): void {
    this.initializeTheme();
    this.setupRouteChangeListener();

    if (this.isBrowser) {
      window.addEventListener('scroll', this.onWindowScroll);
      document.addEventListener('click', this.onDocumentClick);
      document.addEventListener('keydown', this.onKeyDown);
    }
  }

  ngOnDestroy(): void {
    if (this.isBrowser) {
      window.removeEventListener('scroll', this.onWindowScroll);
      document.removeEventListener('click', this.onDocumentClick);
      document.removeEventListener('keydown', this.onKeyDown);
      this.renderer.removeClass(this.document.body, 'mobile-menu-open');
      this.renderer.removeStyle(this.document.body, 'overflow');
    }

    this.destroy$.next();
    this.destroy$.complete();
  }

  /** -------------------
   *  Event listeners
   * ------------------- */
  private onDocumentClick = (event: MouseEvent) => {
    if (!this.isMobile || !this.menuActive) return;

    const target = event.target as HTMLElement;
    const navbar = this.el.nativeElement.querySelector('.navbar-collapse');
    const toggler = this.el.nativeElement.querySelector('.navbar-toggler');

    if (!navbar?.contains(target) && !toggler?.contains(target)) {
      this.closeMenu();
    }
  };

  private onKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape' && this.menuActive) {
      this.closeMenu();
    }
  };

  @HostListener('window:resize')
  private onResize(): void {
    this.checkIfMobile();
  }

  private checkIfMobile(): void {
    const wasMobile = this.isMobile;
    this.isMobile = window.innerWidth < 992; // Bootstrap lg breakpoint

    // যদি desktop এ switch হয় → menu forcefully close হবে
    if (wasMobile && !this.isMobile && this.menuActive) {
      this.closeMenu();
    }
  }

  /** -------------------
   *  Menu Controls
   * ------------------- */
  toggleMenu(): void {
    this.menuActive = !this.menuActive;
    this.updateBodyScroll();

    if (this.isBrowser) {
      if (this.menuActive) {
        this.renderer.addClass(this.document.body, 'mobile-menu-open');
        setTimeout(() => {
          const focusable = this.el.nativeElement.querySelector(
            '.navbar-collapse a, .navbar-collapse button, .navbar-collapse [tabindex]'
          );
          focusable?.focus();
        });
      } else {
        this.renderer.removeClass(this.document.body, 'mobile-menu-open');
        this.navbarToggler?.nativeElement.focus();
      }
    }
  }

  closeMenu(): void {
    if (this.menuActive) {
      this.menuActive = false;
      this.updateBodyScroll();
      if (this.isBrowser) {
        this.renderer.removeClass(this.document.body, 'mobile-menu-open');
      }
    }
  }

  private updateBodyScroll(): void {
    if (this.isBrowser) {
      if (this.menuActive) {
        this.renderer.setStyle(this.document.body, 'overflow', 'hidden');
      } else {
        this.renderer.removeStyle(this.document.body, 'overflow');
      }
    }
  }

  /** -------------------
   *  Router Handling
   * ------------------- */
  private setupRouteChangeListener(): void {
    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        takeUntil(this.destroy$)
      )
      .subscribe(() => this.closeMenu());
  }

  isActive(route: string): boolean {
    return this.router.url === route;
  }

  /** -------------------
   *  Theme Controls
   * ------------------- */
  private initializeTheme(): void {
    if (!this.isBrowser) return;

    const savedTheme = localStorage.getItem('theme') as Theme;
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    this.currentTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
    this.applyTheme(this.currentTheme);

    if (!savedTheme) {
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        this.currentTheme = e.matches ? 'dark' : 'light';
        this.applyTheme(this.currentTheme);
      });
    }
  }

  private applyTheme(theme: Theme): void {
    if (theme === 'dark') {
      this.renderer.addClass(this.document.body, 'dark-theme');
    } else {
      this.renderer.removeClass(this.document.body, 'dark-theme');
    }
  }

  toggleTheme(): void {
    this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
    this.applyTheme(this.currentTheme);
    if (this.isBrowser) {
      localStorage.setItem('theme', this.currentTheme);
    }
  }

  /** -------------------
   *  Scroll Detection
   * ------------------- */
  onWindowScroll = () => {
    if (!this.isBrowser) return;
    this.scrolled = window.scrollY > 50;
  };
}
