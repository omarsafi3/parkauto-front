import { Component, OnInit } from '@angular/core';
import { FonctionService } from './services/fonction.service';
@Component({
  selector: 'app-fonction',
  templateUrl: './fonction.component.html',
  styleUrls: ['./fonction.component.css']
})
export class FonctionComponent implements OnInit {
  fonctions: any[] = [];
  currentFonction: any = null; // for storing the fonction to be edited
  isEditing: boolean = false; // flag to indicate if we are in edit mode
  constructor(private fonctionService: FonctionService) { }

  ngOnInit(): void {
    this.loadFonctions();
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

  edit(fonction: any): void {
    this.currentFonction = { ...fonction }; // create a copy of the fonction
    this.isEditing = true;
  }

  delete(id: number): void {
    this.fonctionService.deleteFonction(id).subscribe(
      (response: any) => {
        console.log('Function deleted:', response);
        this.loadFonctions();
      },
      (error: any) => {
        console.error('Error deleting function', error);
      }
    );
  }

  add(): void {
    this.currentFonction = {
      code: null,
      lib: '',
      part_pre: '',
      part_post: '',
  };
  this.isEditing = true;
  }

  save(): void {
    if (this.currentFonction.code) {
      this.fonctionService.updateFonction(this.currentFonction).subscribe(
        (response: any) => {
          console.log('Function updated:', response);
          this.loadFonctions();
          this.isEditing = false;
        },
        (error: any) => {
          console.error('Error updating function', error);
        }
      );
    } else {
      this.fonctionService.createFonction(this.currentFonction).subscribe(
        (response: any) => {
          console.log('Function created:', response);
          this.loadFonctions();
          this.isEditing = false;
        },
        (error: any) => {
          console.error('Error creating function', error);
        }
      );
    }
  }

  cancel(): void {
    this.isEditing = false;
    this.currentFonction = null;
  }


}
