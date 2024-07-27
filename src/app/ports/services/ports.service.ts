import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PortsService {
  private apiUrl = 'http://localhost:8080/api/ports';
  constructor(private http : HttpClient) { }

  getPorts(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getPort(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  createPort(port: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, port);
  }

  updatePort(port: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${port.id}`, port);
  }

  deletePort(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  
}
