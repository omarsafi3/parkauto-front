import { Component, OnInit } from '@angular/core';
import { VoitureService } from './services/voiture.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { AssuranceContractService } from './services/assurance-contract.service';
import { AssuranceService } from '../assurance/services/assurance.service';
import { VignetteService } from '../vignette/services/vignette.service';
import { VisiteTechniqueService } from './services/visite-technique.service';
import { HistoriqueService } from './services/historique.service';
import { BeneficiaireService } from '../beneficiaire/services/beneficiaire.service';

@Component({
  selector: 'app-voiture',
  templateUrl: './voiture.component.html',
  styleUrls: ['./voiture.component.css'],
})
export class VoitureComponent implements OnInit {
  voitures: any[] = [];
  assurances: any[] = [];
  existingAssurance: any[] = [];
  vignettes: any[] = [];
  visiteTechniques: any[] = [];
  historiques: any[] = [];
  beneficiaires: any[] = [];
  currentVoiture: any = null; // for storing the voiture to be edited
  isEditing: boolean = false; // flag to indicate if we are editing
  detailsVisible: Set<string> = new Set();
  vignetteVisible: Set<string> = new Set();
  visiteTechniqueVisible: Set<string> = new Set();

  constructor(
    private vignetteService: VignetteService,
    private assuranceService: AssuranceService,
    private visiteTechniquesService: VisiteTechniqueService,
    private assuranceContractService: AssuranceContractService,
    private voitureService: VoitureService,
    private historiqueService: HistoriqueService,
    private beneficiaireService: BeneficiaireService,
    private datePipe: DatePipe,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.assuranceService.getAssurances().subscribe(
      (data: any[]) => {
        this.existingAssurance = data;
      },
      (error: any) => {
        console.error('Error loading assurances', error);
      }
    );
    this.loadVignettes();
    this.loadVoitures();
    this.loadAssuranceContracts();
    this.loadVisiteTechniques();
    this.loadHistroique();
    this.loadBeneficiaires();
  }

  loadBeneficiaires(): void {
    this.beneficiaireService.getBeneficiaires().subscribe(
      (data: any[]) => {
        this.beneficiaires = data;
      },
      (error: any) => {
        console.error('Error loading beneficiaires', error);
      }
    );
  }

  loadVisiteTechniques(): void {
    this.visiteTechniquesService.getVisiteTechniques().subscribe(
      (data: any[]) => {
        this.visiteTechniques = data;
      },
      (error: any) => {
        console.error('Error loading visite techniques', error);
      }
    );
  }

  loadVignettes(): void {
    this.vignetteService.getVignettes().subscribe(
      (data: any[]) => {
        this.vignettes = data;
      },
      (error: any) => {
        console.error('Error loading vignettes', error);
      }
    );
  }

  loadHistroique(): void {
    this.historiqueService.getHistorique().subscribe(
      (data: any[]) => {
        this.historiques = data;
      },
      (error: any) => {
        console.error('Error loading historique', error);
      }
    );
  }

  loadAssuranceContracts(): void {
    this.assuranceContractService.getAssuranceContracts().subscribe(
      (data: any[]) => {
        this.assurances = data;
      },
      (error: any) => {
        console.error('Error loading assurance contracts', error);
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

  edit(voiture: any): void {
    this.currentVoiture = { ...voiture }; // create a copy of the voiture
    this.isEditing = true;
  }

  delete(id: string): void {
    this.voitureService.deleteVoiture(id).subscribe(
      (response: any) => {
        console.log('Voiture deleted:', response);
        this.loadVoitures();
      },
      (error: any) => {
        console.error('Error deleting voiture', error);
      }
    );
  }

  add(): void {
    this.currentVoiture = {
      immat: '',
      type: '',
      fonction: '',
      age: null,
      mise_en_route: '',
      puissance: null,
      carburant: '',
      prix: null,
      gps: null,
    };
    this.isEditing = true;
  }

  save(): void {
    // Format the date before saving if it exists
    if (this.currentVoiture.mise_en_route) {
      this.currentVoiture.mise_en_route = this.datePipe.transform(
        this.currentVoiture.mise_en_route,
        'yyyy-MM-dd'
      );
    }

    // Check if the voiture already exists
    const existingVoiture = this.voitures.find(
      (voiture) => voiture.immat === this.currentVoiture.immat
    );

    if (existingVoiture) {
      // Update the existing voiture
      this.voitureService.updateVoiture(this.currentVoiture).subscribe(
        (response: any) => {
          console.log('Voiture updated:', response);
          this.loadVoitures();
          this.isEditing = false;
        },
        (error: any) => {
          console.error('Error updating voiture', error);
        }
      );
    } else {
      // Create a new voiture
      this.voitureService.createVoiture(this.currentVoiture).subscribe(
        (response: any) => {
          console.log('Voiture added:', response);
          this.loadVoitures();
          this.isEditing = false;
        },
        (error: any) => {
          console.error('Error adding voiture', error);
        }
      );
    }
  }

  isDetailsVisible(immat: string): boolean {
    return this.detailsVisible.has(immat);
  }

  isVignetteDetailsVisible(immat: string): boolean {
    return this.vignetteVisible.has(immat);
  }

  isVisiteTechniqueDetailsVisible(immat: string): boolean {
    return this.visiteTechniqueVisible.has(immat);
  }

  toggleVignette(immat: string): void {
    if (this.vignetteVisible.has(immat)) {
      this.vignetteVisible.delete(immat);
    } else {
      this.vignetteVisible.add(immat);
    }
  }

  toggleVisiteTechnique(immat: string): void {
    if (this.visiteTechniqueVisible.has(immat)) {
      this.visiteTechniqueVisible.delete(immat);
    } else {
      this.visiteTechniqueVisible.add(immat);
    }
  }

  getVignette(immat: string): any {
    return (
      this.vignettes
        .filter((vignette) => vignette.immat === immat)
        .sort(
          (a, b) =>
            new Date(b.date_fin).getTime() - new Date(a.date_fin).getTime()
        )[0] || null
    );
  }

  getVisiteTechnique(immat: string): any {
    return (
      this.visiteTechniques
        .filter((visiteTechnique) => visiteTechnique.immat === immat)
        .sort(
          (a, b) =>
            new Date(b.date_fin).getTime() - new Date(a.date_fin).getTime()
        )[0] || null
    );
  }

  toggleDetails(immat: string): void {
    if (this.detailsVisible.has(immat)) {
      this.detailsVisible.delete(immat);
    } else {
      this.detailsVisible.add(immat);
    }
  }

  cancel(): void {
    this.currentVoiture = null;
    this.isEditing = false;
  }

  addInsuranceContract(immat: string): void {
    this.router.navigate(['/add-insurance-contract', immat]);
  }

  addVignette(immat: string): void {
    this.router.navigate(['/add-vignette', immat]);
  }

  addVisiteTechnique(immat: string): void {
    this.router.navigate(['/add-visite-technique', immat]);
  }

  hasInsurance(immat: string): boolean {
    return !!this.assurances.find((assurance) => assurance.immat === immat);
  }

  hasVignette(immat: string): boolean {
    return !!this.vignettes.find((vignette) => vignette.immat === immat);
  }

  hasVisiteTechnique(immat: string): boolean {
    return !!this.visiteTechniques.find(
      (visiteTechnique) => visiteTechnique.immat === immat
    );
  }

  editInsuranceContract(immat: string): void {
    this.router.navigate(['/edit-insurance-contract', immat]);
  }

  getInsuranceContract(immat: string): any {
    return (
      this.assurances.find((assurance) => assurance.immat === immat) || null
    );
  }

  getInsuranceName(ida: number): any {
    return (
      this.existingAssurance.find(
        (existingAssurances) => existingAssurances.ida === ida
      ) || null
    );
  }

  confirmAction(message: string, callback: () => void): void {
    if (confirm(message)) {
      callback();
    }
  }

  payVignette(vignette: any): void {
    vignette.status = 'payée'; // Mark the vignette as paid
    this.vignetteService.updateVignette(vignette).subscribe(
      (response: any) => {
        console.log('Vignette paid:', response);
        this.loadVignettes();
        this.confirmAction(
          'Do you want to register a vignette for this voiture?',
          () => this.router.navigate(['/add-vignette', vignette.immat])
        );
      },
      (error: any) => {
        console.error('Error paying vignette', error);
      }
    );
  }

  payVisiteTechnique(visiteTechnique: any): void {
    visiteTechnique.status = 'payée'; // Mark the visite technique as paid
    this.visiteTechniquesService
      .updateVisiteTechnique(visiteTechnique)
      .subscribe(
        (response: any) => {
          console.log('Visite technique paid:', response);
          this.loadVisiteTechniques();
          this.confirmAction(
            'Do you want to register a Visite Technique for this voiture?',
            () =>
              this.router.navigate([
                '/add-visite-technique',
                visiteTechnique.immat,
              ])
          );
        },
        (error: any) => {
          console.error('Error paying visite technique', error);
        }
      );
  }

  paidVignette(vignette: any): boolean {
    return vignette.status === 'payée';
  }

  paidVisiteTechnique(visiteTechnique: any): boolean {
    return visiteTechnique.status === 'payée';
  }

  addMaintenance(immat: string): void {
    this.router.navigate(['/add-maintenance', immat]);
  }

  showMaintenances(immat: string): void {
    this.router.navigate(['/maintenances', immat]);
  }

  showHistoriquePerImmat(immat: string): any[] {
    return this.historiques.filter((historique) => historique.immat === immat);
  }

  showBeneficiaireHistoriquePerImmat(immat: string): any[] {
    const filteredHistoriques = this.showHistoriquePerImmat(immat);
    return this.beneficiaires.filter((beneficiaire) =>
      filteredHistoriques.some(
        (historique) => historique.idb === beneficiaire.idb
      )
    );
  }

  deleteInsuranceContract(idc: number): void {
    this.assuranceContractService.deleteAssuranceContract(idc).subscribe(
      (response: any) => {
        console.log('Insurance contract deleted:', response);
        this.loadAssuranceContracts();
      },
      (error: any) => {
        console.error('Error deleting insurance contract', error);
      }
    );
  }
}
