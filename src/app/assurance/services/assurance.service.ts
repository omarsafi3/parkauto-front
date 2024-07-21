import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AssuranceService {

  private apiUrl = 'http://localhost:8080/api/assurances';


  constructor(private http : HttpClient) { }

  getAssurances(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }


  getAssurance(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  createAssurance(assurance: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, assurance);
  }


  updateAssurance(assurance: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${assurance.ida}`, assurance);
  }

  deleteAssurance(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }




}
