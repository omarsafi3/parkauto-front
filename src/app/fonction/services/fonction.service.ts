import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FonctionService {
  private apiUrl = 'http://localhost:8080/api/fonctions';
  constructor(private http: HttpClient) { }

  getFonctions(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getFonction(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  createFonction(fonction: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, fonction);
  }

  updateFonction(fonction: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${fonction.code}`, fonction);
  }

  deleteFonction(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }


}


