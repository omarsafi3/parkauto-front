import { Component, OnInit } from '@angular/core';
import { VignetteService } from './services/vignette.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
@Component({
  selector: 'app-vignette',
  templateUrl: './vignette.component.html',
  styleUrls: ['./vignette.component.css'],
})
export class VignetteComponent implements OnInit {
  vignette: any = {
    idv: null,
    date_deb: '',
    date_fin: '',
    cout: null,
    status: '',
    immat: '',
  };
  vignettes: any[] = [];
  currentVignette: any = null; // for storing the vignette to be edited
  isEditing: boolean = false; // flag to indicate if we are
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private vignetteService: VignetteService) {}

  ngOnInit(): void {
    const immat = this.route.snapshot.paramMap.get('immat');
    if (immat) {
      this.vignette.immat = immat;
    }
    this.loadVignettes();
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

  save(): void{
    this.vignetteService.createVignette(this.vignette).subscribe(() => {
      this.router.navigate(['/voitures']);
    });
  }
  cancel(): void {
    this.router.navigate(['/voitures']);
  }

  
}
