import { Component, OnInit } from '@angular/core';
import { AuthService } from '../login/services/auth-service';
import { Router } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  
  inFonction: boolean = localStorage.getItem("inFonction") === "true";
  inBeneficiaire: boolean = localStorage.getItem("inBeneficiaire") === "true";
  inAssurance: boolean = localStorage.getItem("inAssurance") === "true";
  inCarburant: boolean = localStorage.getItem("inCarburant") === "true";
  inCarte: boolean = localStorage.getItem("inCarte") === "true";
  constructor(public authService: AuthService, private router: Router) {
   }

  ngOnInit(): void {
  }
  logout(): void {
    this.authService.logout(); // clear token
    this.router.navigate(['/login']); // navigate to login page
  }

}
