import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Admin } from '../admin.model';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private admins: Admin[] = [];

  constructor() { }

  getAdmins(): Observable<Admin[]> {
    return of(this.admins);
  }

  getAdmin(id: number): Observable<Admin | undefined> {
    const admin = this.admins.find(a => a.id === id);
    return of(admin);
  }

  createAdmin(admin: Admin): Observable<Admin> {
    admin.id = this.admins.length > 0 ? Math.max(...this.admins.map(a => a.id)) + 1 : 1;
    this.admins.push(admin);
    return of(admin);
  }

  updateAdmin(admin: Admin): Observable<Admin | undefined> {
    const index = this.admins.findIndex(a => a.id === admin.id);
    if (index !== -1) {
      this.admins[index] = admin;
      return of(admin);
    }
    return of(undefined);
  }

  deleteAdmin(id: number): Observable<void> {
    this.admins = this.admins.filter(admin => admin.id !== id);
    return of();
  }
}