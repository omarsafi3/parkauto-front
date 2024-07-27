import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VisiteTechniqueService {

  apiUrl = 'http://localhost:8080/api/visiteTechniques';


  constructor(private http: HttpClient) { }

  getVisiteTechniques(): any {
    return this.http.get<any[]>(this.apiUrl);
  }

  getVisiteTechnique(id: number): any {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  createVisiteTechnique(visiteTechnique: any): any {
    return this.http.post<any>(this.apiUrl, visiteTechnique);
  }

  updateVisiteTechnique(visiteTechnique: any): any {
    return this.http.put<any>(`${this.apiUrl}/${visiteTechnique.idvt}`, visiteTechnique);
  }

  deleteVisiteTechnique(id: number): any {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }


}
