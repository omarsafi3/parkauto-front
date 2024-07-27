import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = 'http://localhost:8080/api/admins';

  constructor(private http: HttpClient) { }

  getAdmins(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getAdmin(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  createAdmin(admin: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, admin);
  }

  updateAdmin(admin: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${admin.id}`, admin);
  }

  deleteAdmin(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}