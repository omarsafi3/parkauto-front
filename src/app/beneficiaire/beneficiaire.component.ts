import { Component, OnInit } from '@angular/core';
import { BeneficiaireService } from './services/beneficiaire.service';
import { PortsService } from '../ports/services/ports.service';
import { FonctionService } from '../fonction/services/fonction.service';
import { CarteService } from '../carte/services/carte.service';
import { VoitureService } from '../voiture/services/voiture.service';
import { TransactionsService } from '../transactions/services/transactions.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-beneficiaire',
  templateUrl: './beneficiaire.component.html',
  styleUrls: ['./beneficiaire.component.css']
})
export class BeneficiaireComponent implements OnInit {
  beneficiaires: any[] = [];
  ports: any[] = [];
  fonctions: any[] = [];
  voitures: any[] = [];
  cartes: any[] = [];
  transactions: any[] = [];
  currentBeneficiaire: any = null; // for storing the beneficiaire to be edited
  isEditing: boolean = false; // flag to indicate if we are in edit mode
  cartesWithNoBeneficiary: any[] = [];

  constructor(
      private portsService: PortsService,
      private beneficiaireService: BeneficiaireService,
      private fonctionService: FonctionService,
      private carteService: CarteService,
      private voitureService: VoitureService,
      private transactionsService: TransactionsService,
      private router: Router,
      private route :  ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.loadBeneficiaires();
    this.loadPorts();
    this.loadFonctions();
    this.loadCartes();
    this.loadVoitures();
    this.loadTransactions();
  }

  loadTransactions(): void {
    this.transactionsService.getTransactions().subscribe(
      (data: any[]) => {
        this.transactions = data;
      },
      (error: any) => {
        console.error('Error loading transactions', error);
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

  loadVoitures() : void {
    this.voitureService.getVoitures().subscribe(
      (data: any[]) => {
        this.voitures = data;
      },
      (error: any) => {
        console.error('Error loading cars', error);
      }
    );
  }

  loadCartes(): void {
    this.carteService.getCartes().subscribe(
      (data: any[]) => {
        this.cartes = data;
      },
      (error: any) => {
        console.error('Error loading cards', error);
      }
    );
  }

  loadFonctions(): void {
    this.fonctionService.getFonctions().subscribe(
      (data: any[]) => {
        this.fonctions = data;
      },
      (error: any) => {
        console.error('Error loading functions', error);
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
      port_id: '',
      immat: '',
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

  getFonctionsName(code : number) : any {
    return this.fonctions.find(fonction => fonction.code === code) || '';
  }

  doTransaction(beneficiaire: any): void {
    this.router.navigate(['/add-transaction', beneficiaire.num_carte]);
  }

  showTransactions(beneficiaire: any): void {
    this.router.navigate(['/transactions', beneficiaire.num_carte]);
  }


  filterCardsWithNoBeneficiary(beneficiaires: any[], cartes: any[]): any[] {
    return cartes.filter(carte => 
      !beneficiaires.some(beneficiaire => beneficiaire.num_carte === carte.num_carte)
    );
  }
}
