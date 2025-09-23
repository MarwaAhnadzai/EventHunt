import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatFormFieldModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  // 🔐 Call backend login endpoint
  onLogin(): void {
  const loginData = {
    email: this.email,
    password: this.password
  };

  this.http.post<any>('http://localhost:5000/api/auth/login', loginData).subscribe({
    next: (res) => {
      console.log('Login successful. Token:', res.token);

      // Save token + user to localStorage
      localStorage.setItem('jwtToken', res.token);
      localStorage.setItem('user', JSON.stringify(res.user));

      // ✅ Redirect to profile page
      this.router.navigate(['/profile']);
    },
    error: (err) => {
      console.error('Login failed:', err);
      alert('Login failed: ' + (err.error?.message || err.message || 'Unknown error'));
    }
  });
}}