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
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/dashboard']); // Redirect to home if already logged in
    }
  }

  onSubmit(): void {
    this.authService.login(this.username, this.password).subscribe(
      (response: any) => {
        this.router.navigate(['/dashboard']); // Redirect to home on successful login
        const role = this.authService.getRole();
        console.log('Logged in as:', role);
      },
      (error) => {
        console.error('Login error:', error);
        alert('Invalid username or password');
      }
    );
  }
}