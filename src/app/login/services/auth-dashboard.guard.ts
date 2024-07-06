import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthServiceService } from './auth-service.service'; // Adjust path as per your project structure

@Injectable({
  providedIn: 'root'
})
export class AuthDashboardGuard implements CanActivate {

  constructor(private authService: AuthServiceService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.authService.isLoggedIn.pipe(
      map(loggedIn => {
        if (loggedIn) {
          // If logged in, allow access to /dashboard
          return true;
        } else {
          // If not logged in, redirect to /login
          this.router.navigate(['/login']);
          return false;
        }
      })
    );
  }
}
