import { Component, Inject, OnInit } from '@angular/core';
import { AuthService } from '../login/services/auth-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  
  constructor(@Inject(AuthService) public authService: AuthService, private router: Router) { 
  }

  ngOnInit(): void {
  }
  logout(): void {
    this.authService.logout(); // clear token
    this.router.navigate(['/login']); // navigate to login page
  }

  toggleFonction(): void {
    if (localStorage.getItem("inFonction") === "true") {
      localStorage.setItem("inFonction", "false");
    }
    else {
      localStorage.setItem("inFonction", "true");
    }
  }

  toggleBeneficiaire(): void {
    if (localStorage.getItem("inBeneficiaire") === "true") {
      localStorage.setItem("inBeneficiaire", "false");
    }
    else {
      localStorage.setItem("inBeneficiaire", "true");
    }

  }

  toggleAssurance(): void {
    if (localStorage.getItem("inAssurance") === "true") {
      localStorage.setItem("inAssurance", "false");
    }
    else {
      localStorage.setItem("inAssurance", "true");
    }

  }

  toggleCarburant(): void {
    if (localStorage.getItem("inCarburant") === "true") {
      localStorage.setItem("inCarburant", "false");
    }
    else {
      localStorage.setItem("inCarburant", "true");
    }

  }

  toggleCarte(): void {
    if (localStorage.getItem("inCarte") === "true") {
      localStorage.setItem("inCarte", "false");
    }
    else {
      localStorage.setItem("inCarte", "true");
    }

  }

}
