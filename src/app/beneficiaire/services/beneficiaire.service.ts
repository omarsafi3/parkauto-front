import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BeneficiaireService {

  private apiUrl = 'http://localhost:8080/api/beneficiaires';


  constructor(private http: HttpClient) { }

  getBeneficiaires(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getBeneficiaire(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  createBeneficiaire(beneficiaire: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, beneficiaire);
  }

  updateBeneficiaire(beneficiaire: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${beneficiaire.idb}`, beneficiaire);
  }

  deleteBeneficiaire(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}


