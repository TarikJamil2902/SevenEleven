import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

interface RouteTitle {
  [key: string]: string;
}

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  title: string = 'Dashboard';
  private routeTitles: RouteTitle = {
    'dashboard': 'Dashboard',
    'users': 'User Management',
    'products': 'Products',
    'orders': 'Orders',
    'settings': 'Settings'
  };

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.setTitleFromRoute();
    
    // Update title when route changes
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.setTitleFromRoute();
    });
  }

  private setTitleFromRoute(): void {
    const url = this.router.url;
    const segments = url.split('/').filter(segment => segment);
    
    if (segments.length > 1) {
      const route = segments[1]; // Get the route after 'admin/'
      this.title = this.routeTitles[route] || 'Admin Panel';
    } else {
      this.title = 'Dashboard';
    }
  }

  logout(): void {
    // Add your logout logic here
    this.router.navigate(['/admin/login']);
  }
}
