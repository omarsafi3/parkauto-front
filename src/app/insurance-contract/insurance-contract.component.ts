import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AssuranceContractService } from '../voiture/services/assurance-contract.service';
import { Inject } from '@angular/core';
import { AssuranceService } from '../assurance/services/assurance.service';
@Component({
  selector: 'app-insurance-contract',
  templateUrl: './insurance-contract.component.html',
  styleUrls: ['./insurance-contract.component.css']
})
export class InsuranceContractComponent implements OnInit {

  contract: any = {
    idc : null,
    date_deb: '',
    date_fin: '',
    cout: null,
    type: '',
    immat: '',
    ida: null };

  assurances: any[] = [];

  assuranceService: AssuranceService; // Declare the assuranceService property

  constructor(
      private route: ActivatedRoute,
      private router: Router,
      @Inject(AssuranceContractService) private assuranceContractService: AssuranceContractService
    , assuranceService: AssuranceService) {
      this.assuranceService = assuranceService; // Initialize the assuranceService property
    }

    ngOnInit(): void {
      const immat = this.route.snapshot.paramMap.get('immat');
      if (immat) {
        this.contract.immat = immat;
      }
      this.assuranceService.getAssurances().subscribe(
        (data: any[]) => {
          this.assurances = data;
        },
        (error: any) => {
          console.error('Error loading functions', error);
        }
      );
    }

    save(): void {
      this.assuranceContractService.createAssuranceContract(this.contract).subscribe(() => {
        this.router.navigate(['/voitures']);
      });
    }

    cancel(): void {
      this.router.navigate(['/voitures']);
    }

    loadAssuranceContrats(): void {
      this.assuranceContractService.getAssuranceContracts().subscribe(
        (data: any[]) => {
          this.assurances = data;
        },
        (error: any) => {
          console.error('Error loading functions', error);
        }
      );
    }


}
