import { Component, OnInit } from '@angular/core';
import { BeneficiaireService } from './services/beneficiaire.service';
import { PortsService } from '../ports/services/ports.service';
@Component({
  selector: 'app-beneficiaire',
  templateUrl: './beneficiaire.component.html',
  styleUrls: ['./beneficiaire.component.css']
})
export class BeneficiaireComponent implements OnInit {
  beneficiaires: any[] = [];
  ports: any[] = [];
  currentBeneficiaire: any = null; // for storing the beneficiaire to be edited
  isEditing: boolean = false; // flag to indicate if we are in edit mode

  constructor(private portsService: PortsService, private beneficiaireService: BeneficiaireService) { }

  ngOnInit(): void {
    this.loadBeneficiaires();
    this.loadPorts();
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

  loadBeneficiaires(): void {
    this.beneficiaireService.getBeneficiaires().subscribe(
      (data: any[]) => {
        this.beneficiaires = data;
      },
      (error: any) => {
        console.error('Error loading beneficiaries', error);
      }
    );
  }

  edit(beneficiaire: any): void {
    this.currentBeneficiaire = { ...beneficiaire }; // create a copy of the beneficiaire
    this.isEditing = true;
  }

  delete(id: number): void {
    this.beneficiaireService.deleteBeneficiaire(id).subscribe(
      (response: any) => {
        console.log('Beneficiary deleted:', response);
        this.loadBeneficiaires();
      },
      (error: any) => {
        console.error('Error deleting beneficiary', error);
      }
    );
  }

  add(): void {
    this.currentBeneficiaire = {
      idb: null,
      nom: '',
      prenom: '',
      date_deb: '',
      date_fin: '',
      num_carte: '',
      code: '',
      port_id: ''
    };
    this.isEditing = true;
  }

  save(): void {
    if (this.currentBeneficiaire.idb) {
      // Update existing beneficiaire
      this.beneficiaireService.updateBeneficiaire(this.currentBeneficiaire).subscribe(
        (response: any) => {
          console.log('Beneficiary updated:', response);
          this.loadBeneficiaires();
          this.isEditing = false;
        },
        (error: any) => {
          console.error('Error updating beneficiary', error);
        }
      );
    } else {
      // Add new beneficiaire
      this.beneficiaireService.createBeneficiaire(this.currentBeneficiaire).subscribe(
        (response: any) => {
          console.log('Beneficiary added:', response);
          this.loadBeneficiaires();
          this.isEditing = false;
        },
        (error: any) => {
          console.error('Error adding beneficiary', error);
        }
      );
    }
  }

  cancel(): void {
    this.isEditing = false;
    this.currentBeneficiaire = null;
  }

  getPortName(portId: string): any {
    return this.ports.find(port => port.id === portId) || '';
  }

  
}
