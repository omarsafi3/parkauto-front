import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './login/services/auth-guard';
import { InsuranceContractComponent } from './insurance-contract/insurance-contract.component';
import { VoitureComponent } from './voiture/voiture.component';
import { BeneficiaireComponent } from './beneficiaire/beneficiaire.component';
import { FonctionComponent } from './fonction/fonction.component';
import { AssuranceComponent } from './assurance/assurance.component';
import { CarburantComponent } from './carburant/carburant.component';
import { CarteComponent } from './carte/carte.component';
import { PortsComponent } from './ports/ports.component';
import { VignetteComponent } from './vignette/vignette.component';
import { VisiteTechniqueComponent } from './visite-technique/visite-technique.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'add-insurance-contract/:immat', component: InsuranceContractComponent },
  { path: 'add-vignette/:immat', component: VignetteComponent },
  { path: 'add-visite-technique/:immat', component: VisiteTechniqueComponent},
  { path: 'voitures', component: VoitureComponent },
  { path: 'beneficiaire', component: BeneficiaireComponent },
  { path: 'fonction', component: FonctionComponent },
  { path: 'assurance', component: AssuranceComponent },
  { path: 'carburant', component: CarburantComponent },
  { path: 'carte', component: CarteComponent },
  { path: 'ports', component: PortsComponent },
  { path: '', redirectTo: '/voitures', pathMatch: 'full' }, // Default route
  { path: '**', redirectTo: '/dashboard' } // Wildcard route for undefined paths
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
