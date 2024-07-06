import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthServiceService } from './services/auth-service.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string = "";
  password: string = "";
  constructor(@Inject(AuthServiceService) private authService: AuthServiceService) { }
  ngOnInit(): void {
  }
  onSubmit() {
    this.authService.login(this.username, this.password).subscribe(response => {
      console.log(response);
      // Handle the response here, e.g., save token, navigate to another page, etc.
    }, error => {
      console.error('Login failed', error);
      // Handle the error here, e.g., show an error message
    });
  }
  
  }

  


