import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private loginUrl = 'http://localhost:8080/api/login';
  private loggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private loggedInKey = 'loggedIn';

  constructor(private http: HttpClient, private router: Router) {
    const isLoggedIn = sessionStorage.getItem(this.loggedInKey) === 'true';
    this.loggedInSubject = new BehaviorSubject<boolean>(isLoggedIn);
  }

  login(username: string, password: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const loginData = { username, password };
    return this.http.post(this.loginUrl, loginData, { headers, responseType: 'text' }).pipe(
      tap((loggedIn: string) => {
        if (loggedIn === 'true') {
          this.loggedInSubject.next(true);
          sessionStorage.setItem(this.loggedInKey, 'true'); // Store login state immediately
          this.router.navigate(['/dashboard']).then(() => {
            window.location.reload(); // Reload the entire page
          });
        } else {
          throw new Error('Login failed');
        }
      }),
      catchError((error: any) => {
        console.error('Login error:', error);
        return throwError('Login failed');
      })
    );
  }

  get isLoggedIn(): Observable<boolean> {
    return this.loggedInSubject.asObservable();
  }
}
