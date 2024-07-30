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

  isUser = localStorage.getItem('role') === 'user';
  isSuperAdmin = localStorage.getItem('role') === 'superAdmin';
  
  constructor(public authService: AuthService, private router: Router) {
   }

  

  ngOnInit(): void {
    console.log('Role:', localStorage.getItem('role'));
    console.log(this.isSuperAdmin);
    
  }
  logout(): void {
    this.authService.logout(); // clear token
    this.router.navigate(['/login']); // navigate to login page
  }

}
