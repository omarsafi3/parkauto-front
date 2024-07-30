import { Component, OnInit } from '@angular/core';
import { TransactionsService } from './services/transactions.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CarteService } from '../carte/services/carte.service';
import { CarburantService } from '../carburant/services/carburant.service';
import { BeneficiaireService } from '../beneficiaire/services/beneficiaire.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css'],
})
export class TransactionsComponent implements OnInit {
  isAdding: boolean = false;
  idb: string | null = null;
  transactions: any[] = [];
  cartes: any[] = [];
  carburants: any[] = [];
  beneficiaires: any[] = [];
  transaction: any = {
    kilometrage: null,
    montant: null,
    datet: '',
    station: '',
    idc: '',
    card_id: '',
  };

  num_carte: string | null = null;
  
  constructor(
    private transactionsService: TransactionsService,
    private router: Router,
    private route: ActivatedRoute,
    private carteService: CarteService,
    private carburantService: CarburantService,
    private beneficiaireService: BeneficiaireService
  ) {}

  ngOnInit(): void {
    this.num_carte = this.route.snapshot.paramMap.get('num_carte');
    console.log('num_carte:', this.num_carte);
    if (this.router.url.includes('add-transaction')) {
      this.isAdding = true;
    }
    this.loadCartes();
    this.loadTransactions();
    this.loadCarburants();
    this.loadBeneficiaires();
  }

  loadCarburants(): void {
    this.carburantService.getCarburants().subscribe(
      (data: any[]) => {
        this.carburants = data;
      },
      (error: any) => {
        console.error('Error loading carburants', error);
      }
    );
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

  loadCartes(): void {
    this.carteService.getCartes().subscribe(
      (data: any[]) => {
        this.cartes = data;
        if (this.num_carte) {
          this.transaction.idc = this.getCardIdFromNumCard(this.num_carte);
        }
      },
      (error: any) => {
        console.error('Error loading cards', error);
      }
    );
  }

  loadTransactions(): void {
    this.transactionsService.getTransactions().subscribe(
      (data: any[]) => {
        this.transactions = data;
        if (this.idb) {
          this.loadTransactionsForIdb(this.idb);
        }
      },
      (error: any) => {
        console.error('Error loading transactions', error);
      }
    );
  }

  loadTransactionsForIdb(idb: string): void {
    this.transactions = this.transactions.filter(
      (transaction) => transaction.idb === idb
    );
  }

  getCardIdFromNumCard(num_carte: string): string | undefined {
    console.log('num_carte:', num_carte);
    console.log('cartes:', this.cartes);
    const card = this.cartes.find((carte) => carte.num_carte === num_carte);
    return card ? card.id : undefined;
  }

  save(): void {
    if (this.num_carte) {
      const cardId = this.getCardIdFromNumCard(this.num_carte);
      if (cardId) {
        this.transaction.card_id = cardId;
      } else {
        console.error('Error: Card ID not found for num_carte:', this.num_carte);
        return;
      }
    }
    console.log('Transaction to save:', this.transaction);
    this.transaction.montant = this.transaction.montant * this.getPrixLitreFromIdc(this.transaction.idc).prix_litre;
    this.transactionsService.createTransaction(this.transaction).subscribe(() => {
      this.router.navigate(['/beneficiaires']);
    });
  }

  cancel(): void {
    this.router.navigate(['/beneficiaires']);
  }

  getTransactionsForNumCarte(num_carte: string): any[] {
    this.cartes = this.cartes.filter((carte) => carte.num_carte === num_carte);
    return this.transactions.filter((transaction) => transaction.card_id === this.cartes[0].id);
  }

  getCarburantNamefromId(idc: string): any {
    return this.carburants.find((carburant) => carburant.idc === idc) || '';
  }
  getPrixLitreFromIdc(idc: string): any {
    return this.carburants.find((carburant) => carburant.idc === idc) || '';
  }
}
