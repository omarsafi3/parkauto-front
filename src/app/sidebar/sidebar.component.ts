import { Component, Inject, OnInit } from '@angular/core';
import { AuthService } from '../login/services/auth-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  user: string = localStorage.getItem('user');
  role: string = localStorage.getItem('role');
  isUser = this.role === 'user';
  constructor(@Inject(AuthService) public authService: AuthService, private router: Router) { 
  }

  ngOnInit(): void {
  }
  logout(): void {
    this.authService.logout(); // clear token
    this.router.navigate(['/login']); // navigate to login page
  }
}