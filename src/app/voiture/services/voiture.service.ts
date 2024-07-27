import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VoitureService {

  private apiUrl = 'http://localhost:8080/api/voitures';

  constructor(private http : HttpClient) { }

  getVoitures(): any {
    return this.http.get<any[]>(this.apiUrl);
  }

  getVoiture(id: number): any {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  createVoiture(voiture: any): any {
    return this.http.post<any>(this.apiUrl, voiture);
  }

  updateVoiture(voiture: any): any {
    return this.http.put<any>(`${this.apiUrl}/${voiture.immat}`, voiture);
  }

  deleteVoiture(id: number): any {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  
}
