import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/users';

  constructor(private http: HttpClient) { }

  login(username: string, password: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const body = { username, password };

    return this.http.post<any>(`${this.apiUrl}/login`, body, { headers }).pipe(
      tap(response => {
        if (response.token && response.role) {
          this.setToken(response.token);
          this.setRole(response.role);
        }
      }),
      catchError((error) => {
        console.error('Login error:', error);
        return throwError('Login failed. Please try again.');
      })
    );
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken(): string {
    return localStorage.getItem('token');
  }

  setRole(role: string) {
    localStorage.setItem('role', role);
  }

  getRole(): string {
    return localStorage.getItem('role');
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
