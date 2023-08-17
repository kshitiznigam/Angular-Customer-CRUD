import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  token: string = '';
  

  constructor(private router: Router, private authService: AuthService) {}

  login(): void {
    const hardcodedUsername = 'admin';
    const hardcodedPassword = 'admin@123';
  
    if (this.username === hardcodedUsername && this.password === hardcodedPassword) {
  
      // Store the token in local storage
      localStorage.setItem('access_token', this.token);
      
      this.router.navigate(['/customers']);
    } else {
      alert('Invalid username or password');
    }
  }
}