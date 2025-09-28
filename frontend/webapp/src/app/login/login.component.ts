// src/app/login/login.component.ts
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  isLoading = false;

  constructor(
    private router: Router, 
    private authService: AuthService
  ) {}

  onLogin(): void {
    if (!this.email || !this.password) {
      alert('Please enter both email and password.');
      return;
    }

    this.isLoading = true;

    const loginData = {
      email: this.email,
      password: this.password
    };

    this.authService.login(loginData).subscribe({
      next: (res) => {
        this.isLoading = false;
        console.log('Login successful. User:', res.user);
        this.router.navigate(['/profile']);
      },
      error: (err) => {
        this.isLoading = false;
        console.error('Login failed:', err);
        alert('Login failed: ' + (err.error?.error || 'Unknown error'));
      }
    });
  }
}