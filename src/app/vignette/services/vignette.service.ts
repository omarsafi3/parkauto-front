import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VignetteService {
  private apiUrl = 'http://localhost:8080/api/vignettes';
  constructor(private http: HttpClient) { }

  getVignettes(): any {
    return this.http.get<any[]>(this.apiUrl);
  }

  getVignette(id: number): any {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  createVignette(vignette: any): any {
    return this.http.post<any>(this.apiUrl, vignette);
  }

  updateVignette(vignette: any): any {
    return this.http.put<any>(`${this.apiUrl}/${vignette.idv}`, vignette);
  }

  deleteVignette(id: number): any {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  

}
