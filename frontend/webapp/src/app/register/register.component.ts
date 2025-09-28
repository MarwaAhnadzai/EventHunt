import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';

interface PasswordStrength {
  score: number;
  text: string;
  class: string;
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule, 
    RouterModule,
    MatFormFieldModule, 
    MatInputModule, 
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  isLoading: boolean = false;
  acceptTerms: boolean = false;

  // Password strength properties
  passwordStrength: PasswordStrength = {
    score: 0,
    text: 'Weak',
    class: 'strength-weak'
  };

  constructor(
    private authService: AuthService, 
    private router: Router
  ) {}

  onPasswordChange(): void {
    this.checkPasswordStrength();
  }

  checkPasswordStrength(): void {
    let score = 0;
    
    // Length check
    if (this.password.length >= 8) score += 1;
    if (this.password.length >= 12) score += 1;
    
    // Complexity checks
    if (/[A-Z]/.test(this.password)) score += 1;
    if (/[a-z]/.test(this.password)) score += 1;
    if (/[0-9]/.test(this.password)) score += 1;
    if (/[^A-Za-z0-9]/.test(this.password)) score += 1;
    
    // Update strength display
    if (score >= 6) {
      this.passwordStrength = { score, text: 'Strong', class: 'strength-strong' };
    } else if (score >= 4) {
      this.passwordStrength = { score, text: 'Good', class: 'strength-good' };
    } else if (score >= 2) {
      this.passwordStrength = { score, text: 'Fair', class: 'strength-fair' };
    } else {
      this.passwordStrength = { score, text: 'Weak', class: 'strength-weak' };
    }
  }

  passwordsMatch(): boolean {
    return this.password === this.confirmPassword && this.password.length > 0;
  }

  isFormValid(): boolean {
    return !!this.username && 
           !!this.email && 
           !!this.password && 
           this.passwordsMatch() && 
           this.acceptTerms === true;
  }

  onRegister(): void {
    if (!this.isFormValid()) {
      alert('Please fill in all fields correctly and accept the terms.');
      return;
    }

    if (this.password.length < 6) {
      alert('Password must be at least 6 characters long.');
      return;
    }

    this.isLoading = true;

    const registerData = {
      username: this.username || this.email.split('@')[0],
      email: this.email,
      password: this.password,
      role: 'EVENTHUNT_USER'
    };

    this.authService.register(registerData).subscribe({
      next: () => {
        this.isLoading = false;
        alert('Registration successful! Please log in.');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.isLoading = false;
        console.error('Registration failed:', err);
        alert('Registration failed: ' + (err.error?.error || 'Unknown error'));
      }
    });
  }
}