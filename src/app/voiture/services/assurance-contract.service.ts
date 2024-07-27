import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AssuranceContractService {
  private apiUrl = 'http://localhost:8080/api/contrats';
  constructor(private http : HttpClient) { }

  getAssuranceContracts(): any {
    return this.http.get<any[]>(this.apiUrl);
  }

  getAssuranceContract(id: number): any {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  createAssuranceContract(assuranceContract: any): any {
    return this.http.post<any>(this.apiUrl, assuranceContract);
  }

  updateAssuranceContract(assuranceContract: any): any {
    return this.http.put<any>(`${this.apiUrl}/${assuranceContract.id}`, assuranceContract);
  }

  deleteAssuranceContract(id: number): any {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  

}
