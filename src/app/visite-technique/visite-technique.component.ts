import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VisiteTechniqueService } from '../voiture/services/visite-technique.service';
@Component({
  selector: 'app-visite-technique',
  templateUrl: './visite-technique.component.html',
  styleUrls: ['./visite-technique.component.css']
})
export class VisiteTechniqueComponent implements OnInit {

  visiteTechnique: any = {
    idvt: null,
    date_deb: '',
    date_fin: '',
    cout: null,
    status: '',
    immat: '',
  };

  constructor(private route: ActivatedRoute,
    private router: Router,
    private visiteTechniqueService: VisiteTechniqueService
  ) { }

  ngOnInit(): void {

    const immat = this.route.snapshot.paramMap.get('immat');
    if (immat) {
      this.visiteTechnique.immat = immat;
    }
  }

  save(): void {
    this.visiteTechnique.status = 'non payée';
    this.visiteTechniqueService.createVisiteTechnique(this.visiteTechnique).subscribe(() => {
      this.router.navigate(['/voitures']);
    });
  }

  cancel(): void {
    this.router.navigate(['/voitures']);
  }

}
