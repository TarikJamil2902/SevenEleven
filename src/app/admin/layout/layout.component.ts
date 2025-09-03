import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { Subscription, filter } from 'rxjs';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit, OnDestroy {
  @ViewChild('sidenav') sidenav!: MatSidenav;

  isMobile = false;
  menuItems = [
    { name: 'Dashboard', icon: 'dashboard', link: '/admin/dashboard' },
    { name: 'Products', icon: 'inventory', link: '/admin/products' },
    { name: 'Settings', icon: 'settings', link: '/admin/settings' }
  ];

  private mediaSubscription!: Subscription;
  private routerEventsSubscription!: Subscription;

  constructor(private router: Router, private mediaObserver: MediaObserver) {}

  ngOnInit() {
    this.checkScreenSize();

    this.mediaSubscription = this.mediaObserver.asObservable().subscribe(() => {
      this.checkScreenSize();
    });

    this.routerEventsSubscription = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      if (this.isMobile) {
        this.sidenav.close();
      }
    });
  }

  private checkScreenSize() {
    this.isMobile = this.mediaObserver.isActive('(max-width: 959.98px)');
    if (this.isMobile) {
      this.sidenav?.close();
    } else {
      this.sidenav?.open();
    }
  }

  toggleSidebar() {
    this.sidenav.toggle();
  }

  navigate(link: string) {
    this.router.navigate([link]);
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/admin/login']);
  }

  ngOnDestroy() {
    this.mediaSubscription?.unsubscribe();
    this.routerEventsSubscription?.unsubscribe();
  }
}
