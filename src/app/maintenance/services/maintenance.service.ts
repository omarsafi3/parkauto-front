import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class MaintenanceService {
  private apiUrl = 'http://localhost:8080/api/maintenance';
  constructor(private http: HttpClient) { }


  getMaintenances(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getMaintenance(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  createMaintenance(maintenance: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, maintenance);
  }

  updateMaintenance(maintenance: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${maintenance.id}`, maintenance);
  }

  deleteMaintenance(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
