import { Component, OnInit } from '@angular/core';
import { VoitureService } from '../voiture/services/voiture.service';
import { PortsService } from '../ports/services/ports.service';
import { AdminService } from './services/admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  admins: any[] = [];
  voitures: any[] = [];
  ports: any[] = [];
  
  currentAdmin: any = null;
  currentVoiture: any = null;
  currentPort: any = null;

  isEditingAdmin: boolean = false;
  isEditingVoiture: boolean = false;
  isEditingPort: boolean = false;

  constructor(
    private adminService: AdminService,
    private voitureService: VoitureService,
    private portsService: PortsService
  ) { }

  ngOnInit(): void {
    this.loadAdmins();
    this.loadVoitures();
    this.loadPorts();
  }

  loadAdmins(): void {
    this.adminService.getAdmins().subscribe(
      (data: any[]) => {
        this.admins = data;
      },
      (error: any) => {
        console.error('Error loading admins', error);
      }
    );
  }

  loadVoitures(): void {
    this.voitureService.getVoitures().subscribe(
      (data: any[]) => {
        this.voitures = data;
      },
      (error: any) => {
        console.error('Error loading voitures', error);
      }
    );
  }

  loadPorts(): void {
    this.portsService.getPorts().subscribe(
      (data: any[]) => {
        this.ports = data;
      },
      (error: any) => {
        console.error('Error loading ports', error);
      }
    );
  }

  // Admin CRUD Operations
  editAdmin(admin: any): void {
    this.currentAdmin = { ...admin };
    this.isEditingAdmin = true;
  }

  deleteAdmin(id: number): void {
    this.adminService.deleteAdmin(id).subscribe(
      (response: any) => {
        console.log('Admin deleted:', response);
        this.loadAdmins();
      },
      (error: any) => {
        console.error('Error deleting admin', error);
      }
    );
  }

  addAdmin(): void {
    this.currentAdmin = {
      id: null,
      username: '',
      email: '',
      role: ''
    };
    this.isEditingAdmin = true;
  }

  saveAdmin(): void {
    if (this.currentAdmin.id) {
      this.adminService.updateAdmin(this.currentAdmin).subscribe(
        (response: any) => {
          console.log('Admin updated:', response);
          this.loadAdmins();
          this.isEditingAdmin = false;
        },
        (error: any) => {
          console.error('Error updating admin', error);
        }
      );
    } else {
      this.adminService.createAdmin(this.currentAdmin).subscribe(
        (response: any) => {
          console.log('Admin created:', response);
          this.loadAdmins();
          this.isEditingAdmin = false;
        },
        (error: any) => {
          console.error('Error creating admin', error);
        }
      );
    }
  }

  cancelAdmin(): void {
    this.isEditingAdmin = false;
    this.currentAdmin = null;
  }

  // Voiture CRUD Operations
  editVoiture(voiture: any): void {
    this.currentVoiture = { ...voiture };
    this.isEditingVoiture = true;
  }

  deleteVoiture(immat: string): void {
    this.voitureService.deleteVoiture(immat).subscribe(
      (response: any) => {
        console.log('Voiture deleted:', response);
        this.loadVoitures();
      },
      (error: any) => {
        console.error('Error deleting voiture', error);
      }
    );
  }

  addVoiture(): void {
    this.currentVoiture = {
      immat: '',
      type: '',
      age: null,
      mise_en_route: '',
      puissance: null,
      carburant: '',
      prix: null,
      gps: false
    };
    this.isEditingVoiture = true;
  }

  saveVoiture(): void {
    if (this.currentVoiture.immat) {
      this.voitureService.updateVoiture(this.currentVoiture).subscribe(
        (response: any) => {
          console.log('Voiture updated:', response);
          this.loadVoitures();
          this.isEditingVoiture = false;
        },
        (error: any) => {
          console.error('Error updating voiture', error);
        }
      );
    } else {
      this.voitureService.createVoiture(this.currentVoiture).subscribe(
        (response: any) => {
          console.log('Voiture created:', response);
          this.loadVoitures();
          this.isEditingVoiture = false;
        },
        (error: any) => {
          console.error('Error creating voiture', error);
        }
      );
    }
  }

  cancelVoiture(): void {
    this.isEditingVoiture = false;
    this.currentVoiture = null;
  }

  // Port CRUD Operations
  editPort(port: any): void {
    this.currentPort = { ...port };
    this.isEditingPort = true;
  }

  deletePort(id: number): void {
    this.portsService.deletePort(id).subscribe(
      (response: any) => {
        console.log('Port deleted:', response);
        this.loadPorts();
      },
      (error: any) => {
        console.error('Error deleting port', error);
      }
    );
  }

  addPort(): void {
    this.currentPort = {
      id: null,
      lib: ''
    };
    this.isEditingPort = true;
  }

  savePort(): void {
    if (this.currentPort.id) {
      this.portsService.updatePort(this.currentPort).subscribe(
        (response: any) => {
          console.log('Port updated:', response);
          this.loadPorts();
          this.isEditingPort = false;
        },
        (error: any) => {
          console.error('Error updating port', error);
        }
      );
    } else {
      this.portsService.createPort(this.currentPort).subscribe(
        (response: any) => {
          console.log('Port created:', response);
          this.loadPorts();
          this.isEditingPort = false;
        },
        (error: any) => {
          console.error('Error creating port', error);
        }
      );
    }
  }

  cancelPort(): void {
    this.isEditingPort = false;
    this.currentPort = null;
  }
}