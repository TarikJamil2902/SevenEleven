import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { NavbarService } from './services/navbar.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'SevenEleven';
  showNavbar = true;
  private subscription: Subscription = new Subscription();

  constructor(
    private router: Router,
    private navbarService: NavbarService
  ) {}

  ngOnInit() {
    // Subscribe to navbar visibility changes
    this.subscription.add(
      this.navbarService.showNavbar$.subscribe(show => {
        this.showNavbar = show;
      })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
