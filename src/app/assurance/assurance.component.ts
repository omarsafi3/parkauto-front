import { Component, OnInit } from '@angular/core';
import { AssuranceService } from './services/assurance.service';

@Component({
  selector: 'app-assurance',
  templateUrl: './assurance.component.html',
  styleUrls: ['./assurance.component.css']
})
export class AssuranceComponent implements OnInit {

  assurances: any[] = [];
  currentAssurance: any = null; // for storing the assurance to be edited
  isEditing: boolean = false; // flag to indicate if we are in edit mode

  constructor(private assuranceService: AssuranceService) { }

  ngOnInit(): void {
    this.loadAssurances();

  }

  loadAssurances(): void {
    this.assuranceService.getAssurances().subscribe(
      (data: any[]) => {
        this.assurances = data;
      },
      (error: any) => {
        console.error('Error loading functions', error);
      }
    );
  }

  edit(assurance: any): void {
    this.currentAssurance = { ...assurance }; // create a copy of the assurance
    this.isEditing = true;
  }

  delete(id: number): void {
    this.assuranceService.deleteAssurance(id).subscribe(
      (response: any) => {
        console.log('Function deleted:', response);
        this.loadAssurances();
      },
      (error: any) => {
        console.error('Error deleting function', error);
      }
    );
  }

  add(): void {
    this.currentAssurance = {
      ida: null,
      libelle: '',
  };
  this.isEditing = true;
  }

  save(): void {
    if (this.currentAssurance.ida) {
      this.assuranceService.updateAssurance(this.currentAssurance).subscribe(
        (response: any) => {
          console.log('Function updated:', response);
          this.loadAssurances();
          this.isEditing = false;
        },
        (error: any) => {
          console.error('Error updating function', error);
        }
      );
    } else {
      this.assuranceService.createAssurance(this.currentAssurance).subscribe(
        (response: any) => {
          console.log('Function created:', response);
          this.loadAssurances();
          this.isEditing = false;
        },
        (error: any) => {
          console.error('Error creating function', error);
        }
      );
    }
  }

  cancel(): void {  
    this.currentAssurance = null;
    this.isEditing = false;
  }

}
