import { Component, OnInit } from '@angular/core';
import { CarburantService } from './services/carburant.service';

@Component({
  selector: 'app-carburant',
  templateUrl: './carburant.component.html',
  styleUrls: ['./carburant.component.css']
})
export class CarburantComponent implements OnInit {
  carburants: any[] = [];
  currentCarburant: any = null; // for storing the carburant to be edited
  isEditing: boolean = false; // flag to indicate if we are in edit mode

  constructor(private carburantService: CarburantService) { }

  ngOnInit(): void {
    this.loadCarburants();
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

  edit(carburant: any): void {
    this.currentCarburant = { ...carburant }; // create a copy of the carburant
    this.isEditing = true;
  }

  delete(id: number): void {
    this.carburantService.deleteCarburant(id).subscribe(
      (response: any) => {
        console.log('Carburant deleted:', response);
        this.loadCarburants();
      },
      (error: any) => {
        console.error('Error deleting carburant', error);
      }
    );
  }

  add(): void {
    this.currentCarburant = {
      idc: null,
      lib: '',
      prix_litre: '',
  };
  this.isEditing = true;
  }

  save(): void {
    if (this.currentCarburant.idc) {
      this.carburantService.updateCarburant(this.currentCarburant).subscribe(
        (response: any) => {
          console.log('Carburant updated:', response);
          this.loadCarburants();
          this.isEditing = false;
        },
        (error: any) => {
          console.error('Error updating carburant', error);
        }
      );
    } else {
      this.carburantService.createCarburant(this.currentCarburant).subscribe(
        (response: any) => {
          console.log('Carburant created:', response);
          this.loadCarburants();
          this.isEditing = false;
        },
        (error: any) => {
          console.error('Error creating carburant', error);
        }
      );
    }
  }

  cancel(): void {
    this.isEditing = false;
    this.currentCarburant = null;
  }

}
