import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HistoriqueService {
  private apiUrl = 'http://localhost:8080/api/historique';

  constructor(private http: HttpClient) { }

  getHistorique() {
    return this.http.get(this.apiUrl);
  }

  getHistoriqueById(id: number) {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  addHistorique(historique: any) {
    return this.http.post(this.apiUrl, historique);
  }

  updateHistorique(historique: any) {
    return this.http.put(`${this.apiUrl}/${historique.idh}`, historique);
  }

  deleteHistorique(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
