import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'parkauto';
  showLoginLink: boolean = true;
  isLoggedIn: boolean = sessionStorage.getItem('loggedIn') === 'true';

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.showLoginLink = event.url !== '/login';
      }
    });
  }
  
}
