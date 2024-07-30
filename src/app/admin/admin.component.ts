import { Component, OnInit } from '@angular/core';
import { AdminService } from './services/admin.service';
import { Admin } from './admin.model';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  admins: Admin[] = [];
  newAdmin: Admin = { id: 0, username: '', password: '', role: '' };
  selectedAdmin: Admin | null = null;

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.adminService.getAdmins().subscribe(
      (data) => {
        if (data && Array.isArray(data)) {
          this.admins = data;
          // Correcting the usage here, assuming selectedAdmin has the id you want to match
          const selectedId = this.selectedAdmin?.id ?? 0; // Default to 0 if selectedAdmin or id is null/undefined
          const index = this.admins.findIndex(admin => admin && admin.id === selectedId);
          console.log('Index found:', index);
        } else {
          console.warn('Data is not an array or is undefined');
        }
      },
      (error) => {
        console.error('Error fetching admins', error);
      }
    );
  }

  loadAdmins() {
    this.adminService.getAdmins().subscribe(data => {
      this.admins = data;
    });
  }

  selectAdmin(admin: Admin) {
    this.selectedAdmin = { ...admin }; // Clone the admin to avoid direct mutation
  }

  createAdmin() {
    this.adminService.createAdmin(this.newAdmin).subscribe(data => {
      this.admins.push(data);
      this.newAdmin = { id: 0, username: '', password: '', role: '' };
    });
  }

  updateAdmin() {
    if (this.selectedAdmin) {
      this.adminService.updateAdmin(this.selectedAdmin).subscribe(data => {
        const index = this.admins.findIndex(a => a.id === data.id);
        if (index !== -1) {
          this.admins[index] = data;
        }
        this.selectedAdmin = null;
      });
    }
  }

  deleteAdmin(id: number): void {
    this.adminService.deleteAdmin(id).subscribe(
      (response) => {
        console.log('Admin deleted', response);
        this.admins = this.admins.filter(admin => admin.id !== id); // Update the local list
      },
      (error) => console.error('Error deleting admin', error)
    );
  }
  clearSelection() {
    this.selectedAdmin = null;
  }
}