// login.component.ts

import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string;
  password: string;
  loginError: string;
  
  

  constructor(@Inject(AuthService) public authService: AuthService, private router: Router) { 
    localStorage.setItem("isLoggedIn", "false");
  }

  ngOnInit(): void {
    if (this.authService.isLoggedIn() && this.authService.getRole() === 'superAdmin') {
      this.router.navigate(['/beneficiaire']); // Redirect to home if already logged in
    } else if (this.authService.isLoggedIn() && this.authService.getRole() === 'user') {
      this.router.navigate(['/ordre-mission']); // Redirect to home if already logged in
    }
  }

  onSubmit(): void {
    this.authService.login(this.username, this.password).subscribe(
      (response: any) => {
         // Redirect to home on successful login
        const role = this.authService.getRole();
        if (role === 'superAdmin') {
          this.router.navigate(['/beneficiaire']);
        } else if (role === 'user') {
          this.router.navigate(['/ordre-mission']);
        }
        console.log('Logged in as:', role);
      },
      (error) => {
        console.error('Login error:', error);
        alert('Invalid username or password');
      }
    );
  }
}