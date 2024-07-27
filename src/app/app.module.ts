import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BeneficiaireComponent } from './beneficiaire/beneficiaire.component';
import { FonctionComponent } from './fonction/fonction.component';
import { AssuranceComponent } from './assurance/assurance.component';
import { CarburantComponent } from './carburant/carburant.component';
import { CarteComponent } from './carte/carte.component';
import { PortsComponent } from './ports/ports.component';
import { VoitureComponent } from './voiture/voiture.component';
import { DatePipe } from '@angular/common';
import { InsuranceContractComponent } from './insurance-contract/insurance-contract.component';
import { VignetteComponent } from './vignette/vignette.component';
import { VisiteTechniqueComponent } from './visite-technique/visite-technique.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    SidebarComponent,
    BeneficiaireComponent,
    FonctionComponent,
    AssuranceComponent,
    CarburantComponent,
    CarteComponent,
    PortsComponent,
    VoitureComponent,
    InsuranceContractComponent,
    VignetteComponent,
    VisiteTechniqueComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],

  providers: [
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
