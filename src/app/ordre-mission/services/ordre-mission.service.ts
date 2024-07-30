import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdreMissionService {
  private apiUrl = 'http://localhost:8080/api/ordres-de-mission';
  constructor(private http : HttpClient) { }

  getOrdresDeMission(): Observable<any> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getOrdreDeMission(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  createOrdreDeMission(ordreDeMission: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, ordreDeMission);
  }

  updateOrdreDeMission(ordreDeMission: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${ordreDeMission.id}`, ordreDeMission);
  }

  deleteOrdreDeMission(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }


}
