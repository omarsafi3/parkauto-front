import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'parkauto';
  showLoginLink: boolean = true; // Initially show the login link

  constructor(private router: Router) {
    // Listen to router events to detect navigation to login page
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd && event.url === '/login') {
        // Hide the login link if navigation ends at /login
        this.showLoginLink = false;
      }
    });
  }
}
