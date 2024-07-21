import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CarburantService {
  private apiUrl = 'http://localhost:8080/api/carburants';
  constructor(private http: HttpClient) { }

  getCarburants(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getCarburant(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  createCarburant(carburant: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, carburant);
  }

  updateCarburant(carburant: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${carburant.idc}`, carburant);
  }

  deleteCarburant(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }



}
