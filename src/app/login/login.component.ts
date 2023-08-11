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
  input: string = '';

  constructor(private router: Router, private authService: AuthService) {}

  login(): void {
    const hardcodedUsername = 'admin';
    const hardcodedPassword = 'admin@123';
  
    if (this.username === hardcodedUsername && this.password === hardcodedPassword) {
      // Generate your token here
      const token = 'your_generated_token';
  
      // Store the token in local storage
      localStorage.setItem('access_token', token);
      
      this.router.navigate(['/customers']);
    } else {
      alert('Invalid username or password');
    }
  }
}