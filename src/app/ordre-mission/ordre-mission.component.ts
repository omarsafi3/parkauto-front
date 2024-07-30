import { Component, OnInit } from '@angular/core';
import { OrdreMissionService } from './services/ordre-mission.service';
import { BeneficiaireService } from '../beneficiaire/services/beneficiaire.service';
import * as html2pdf from 'html2pdf.js';

@Component({
  selector: 'app-ordre-mission',
  templateUrl: './ordre-mission.component.html',
  styleUrls: ['./ordre-mission.component.css']
})
export class OrdreMissionComponent implements OnInit {
  isEditing = false;
  role = localStorage.getItem('role');
  beneficiaires: any[] = [];
  ordresDeMission: any[] = [];
  successMessage : string = '';
  ordre: any = {
    employe_id: '',
    objectif: '',
    date_dep: '',
    date_arr: '',
    trajet: '',
    courrier: '',
    accompagnant: '',
    status: 'pending',
  };
  datesInvalid = false;

  constructor(
    private ordreMission: OrdreMissionService,
    private beneficiaireService: BeneficiaireService
  ) {}

  ngOnInit(): void {
    this.getBeneficiaires();
    this.loadOrdresDeMission();
  }

  loadOrdresDeMission(): void {
    this.ordreMission.getOrdresDeMission().subscribe(
      (response: any) => {
        this.ordresDeMission = response;
      },
      (error) => {
        console.error('Ordres de mission retrieval error:', error);
      }
    );
  }
  onSubmit(): void {
    if (!this.datesInvalid) {
      console.log('Ordre de mission:', this.ordre);
      this.ordreMission.createOrdreDeMission(this.ordre).subscribe(
        (response: any) => {
          this.successMessage = 'Ordre de mission créé avec succès';
          this.isEditing = false;
          console.log('Ordre de mission created:', response);
        },
        (error) => {
          console.error('Ordre de mission creation error:', error);
        }
      );
    }
  }
  getBeneficiaires(): void {
    this.beneficiaireService.getBeneficiaires().subscribe(
      (response: any) => {
        this.beneficiaires = response;
      },
      (error) => {
        console.error('Beneficiaires retrieval error:', error);
      }
    );
  }

  confirm(ordre: any): void {
    ordre.status = 'confirmée';
    this.ordreMission.updateOrdreDeMission(ordre).subscribe(
      (response: any) => {
        console.log('Ordre de mission confirmed:', response);
      },
      (error) => {
        console.error('Ordre de mission confirmation error:', error);
      }
    );
  }

  getBeneficiaireWithCode(code: string): any[] {
    return this.beneficiaires.filter(b => b.code === code);
  }

  delete(ordre: any): void {
    this.ordreMission.deleteOrdreDeMission(ordre.id).subscribe(
      (response: any) => {
        this.loadOrdresDeMission();
        console.log('Ordre de mission deleted:', response);
      },
      (error) => {
        console.error('Ordre de mission deletion error:', error);
      }
    );
  }

  edit(ordre: any): void {
    this.isEditing = true;
    this.ordre = { ...ordre };
  }

  cancelEdit(): void {
    this.isEditing = false;
    this.ordre = {
      employe_id: '',
      objectif: '',
      date_dep: '',
      date_arr: '',
      trajet: '',
      courrier: '',
      accompagnant: '',
      status: 'pending',
    };
  }

  getBeneficiaireName(id: string): string {
    const beneficiaire = this.beneficiaires.find(b => b.idb === id);
    return beneficiaire ? `${beneficiaire.nom} ${beneficiaire.prenom}` : 'Unknown';
  }

  validateDates(): void {
    this.datesInvalid = new Date(this.ordre.date_dep) >= new Date(this.ordre.date_arr);
  }

  viewAndPrintOrdre(ordre: any): void {
    this.ordre = ordre;
    const printableElement = document.querySelector('.printable-section');
    if (printableElement) {
      printableElement.classList.remove('d-none');
      const options = {
        margin: 1,
        filename: 'mission-order.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
      };
      html2pdf().from(printableElement).set(options).save().then(() => {
        printableElement.classList.add('d-none');
      });
    } else {
      console.error('Printable section not found');
    }
  }
}
