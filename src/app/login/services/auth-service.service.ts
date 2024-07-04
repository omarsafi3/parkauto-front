import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private loginUrl = 'http://localhost:8080/api/login'; // Update with your actual URL

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const loginData = { username, password };
    return this.http.post(this.loginUrl, loginData, { headers, responseType: 'text' });
  }
}
