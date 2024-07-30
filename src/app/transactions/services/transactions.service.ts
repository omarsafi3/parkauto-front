import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {
  private apiUrl = 'http://localhost:8080/api/transactions';
  constructor(private http: HttpClient) { }

  getTransactions(): any {
    return this.http.get<any[]>(this.apiUrl);
  }

  getTransaction(id: number): any {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  createTransaction(transaction: any): any {
    return this.http.post<any>(this.apiUrl, transaction);
  }

  updateTransaction(transaction: any): any {
    return this.http.put<any>(`${this.apiUrl}/${transaction.id}`, transaction);
  }
}
