import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarteService {
  private apiUrl = 'http://localhost:8080/api/cartes';
  constructor(private http: HttpClient) { }

  getCartes(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getCarte(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  createCarte(carte: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, carte);
  }

  updateCarte(carte: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${carte.id}`, carte);
  }

  deleteCarte(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }


}
