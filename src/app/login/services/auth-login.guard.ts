import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthServiceService } from './auth-service'; // Adjust path as per your project structure

@Injectable({
  providedIn: 'root'
})
export class AuthLoginGuard implements CanActivate {

  constructor(private authService: AuthServiceService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.authService.isLoggedIn.pipe(
      map(loggedIn => {
        if (loggedIn) {
          // If logged in, redirect to /dashboard
          this.router.navigate(['/dashboard']);
          return false;
        }
        // Allow access to /login if not logged in
        return true;
      })
    );
  }
}
