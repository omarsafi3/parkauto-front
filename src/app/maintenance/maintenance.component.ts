import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MaintenanceService } from './services/maintenance.service';

@Component({
  selector: 'app-maintenance',
  templateUrl: './maintenance.component.html',
  styleUrls: ['./maintenance.component.css'],
})
export class MaintenanceComponent implements OnInit {
  maintenance: any = {
    idm: null,
    typem: '',
    description: '',
    cout: null,
    datem: '',
    garage: '',
    immat: '',
  };

  maintenances: any[] = [];
  immat: string | null = null;
  isAdding: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private maintenanceService: MaintenanceService
  ) {}

  ngOnInit(): void {
    this.immat = this.route.snapshot.paramMap.get('immat');
    if (this.router.url.includes('add-maintenance')) {
      this.isAdding = true;
      if (this.immat) {
        this.maintenance.immat = this.immat;
      }
    } else {
      this.loadAllMaintenances();
    }
  }

  loadAllMaintenances(): void {
    this.maintenanceService.getMaintenances().subscribe(
      (data: any[]) => {
        this.maintenances = data;
        if (this.immat) {
          this.loadMaintenancesForImmat(this.immat);
        }
      },
      (error: any) => {
        console.error('Error loading maintenances', error);
      }
    );
  }

  loadMaintenancesForImmat(immat: string): void {
    this.maintenances = this.maintenances.filter((maintenance) => maintenance.immat === immat);
  }

  save(): void {
    this.maintenanceService.createMaintenance(this.maintenance).subscribe(() => {
      this.router.navigate(['/voitures']);
    });
  }

  cancel(): void {
    this.router.navigate(['/voitures']);
  }
}
