import { Component, OnInit } from '@angular/core';
import { CarteService } from './services/carte.service';

@Component({
  selector: 'app-carte',
  templateUrl: './carte.component.html',
  styleUrls: ['./carte.component.css']
})
export class CarteComponent implements OnInit {
  cartes: any[] = [];
  currentCarte: any = null; // for storing the carte to be edited
  isEditing: boolean = false; // flag to indicate if we are in edit mode

  constructor(private carteService: CarteService) { }

  ngOnInit(): void {
    this.loadCartes();
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

  edit(carte: any): void {
    this.currentCarte = { ...carte }; // create a copy of the carte
    this.isEditing = true;
  }

  delete(id: number): void {
    this.carteService.deleteCarte(id).subscribe(
      (response: any) => {
        console.log('Card deleted:', response);
        this.loadCartes();
      },
      (error: any) => {
        console.error('Error deleting card', error);
      }
    );
  }

  add(): void {
    this.currentCarte = {
      id: null,
      num_carte: null,
      nbr_litres: null
    };
    this.isEditing = true;
  }

  save(): void {
    if (this.currentCarte.id) {
      this.carteService.updateCarte(this.currentCarte).subscribe(
        (response: any) => {
          console.log('Card updated:', response);
          this.loadCartes();
          this.isEditing = false;
        },
        (error: any) => {
          console.error('Error updating card', error);
        }
      );
    } else {
      this.carteService.createCarte(this.currentCarte).subscribe(
        (response: any) => {
          console.log('Card added:', response);
          this.loadCartes();
          this.isEditing = false;
        },
        (error: any) => {
          console.error('Error adding card', error);
        }
      );
    }
    this.isEditing = false;
  }

  cancel(): void {
    this.currentCarte = null;
    this.isEditing = false;
  }

}
