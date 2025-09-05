import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {
  private showNavbar = new BehaviorSubject<boolean>(true);
  showNavbar$ = this.showNavbar.asObservable();

  setVisibility(show: boolean) {
    this.showNavbar.next(show);
  }
}
