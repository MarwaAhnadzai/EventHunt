// src/app/profile-edit/profile-edit.component.ts
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { AuthService } from '../services/auth.service';

interface UserProfile {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  dob: string;
  role: string;
  username: string;
  createdAt: string;
}

@Component({
  selector: 'app-profile-edit',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent implements OnInit {
  user: UserProfile = {
    id: 0,
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    dob: '',
    role: '',
    username: '',
    createdAt: ''
  };

  isLoading: boolean = false;
  showSuccessMessage: boolean = false;
  showErrorMessage: boolean = false;
  message: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadUserProfile();
  }

  loadUserProfile(): void {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      // Populate with current user data
      this.user = {
        id: currentUser.id || 0,
        firstName: currentUser.firstName || currentUser.username || '',
        lastName: currentUser.lastName || '',
        email: currentUser.email || '',
        phone: currentUser.phone || '',
        address: currentUser.address || '',
        dob: currentUser.dob || '',
        role: currentUser.role || 'EVENTHUNT_USER',
        username: currentUser.username || '',
        createdAt: currentUser.createdAt || new Date().toISOString()
      };
    } else {
      this.router.navigate(['/login']);
    }
  }

  getAvatarInitials(): string {
    const first = this.user.firstName?.charAt(0) || '';
    const last = this.user.lastName?.charAt(0) || '';
    const username = this.user.username?.charAt(0) || '';
    return (first + last).toUpperCase() || username.toUpperCase() || 'U';
  }

  saveProfile(): void {
    if (!this.isFormValid()) {
      this.showMessage('Please fill in all required fields.', 'error');
      return;
    }

    this.isLoading = true;
    this.showSuccessMessage = false;
    this.showErrorMessage = false;

    // Simulate API call - in a real app, you'd call your backend here
    setTimeout(() => {
      try {
        // Update user data in auth service (local storage)
        const updatedUser = {
          ...this.authService.getCurrentUser(),
          ...this.user
        };
        
        this.authService.setCurrentUser(updatedUser);

        this.isLoading = false;
        this.showMessage('Profile updated successfully!', 'success');
        
        // Redirect to profile page after 2 seconds
        setTimeout(() => {
          this.router.navigate(['/profile']);
        }, 2000);
      } catch (error) {
        this.isLoading = false;
        this.showMessage('Failed to update profile. Please try again.', 'error');
        console.error('Profile update error:', error);
      }
    }, 1500);
  }

  isFormValid(): boolean {
    return !!this.user.firstName && 
           !!this.user.lastName && 
           !!this.user.email;
  }

  showMessage(text: string, type: 'success' | 'error'): void {
    this.message = text;
    if (type === 'success') {
      this.showSuccessMessage = true;
      this.showErrorMessage = false;
    } else {
      this.showSuccessMessage = false;
      this.showErrorMessage = true;
    }

    // Auto-hide messages after 5 seconds
    setTimeout(() => {
      this.showSuccessMessage = false;
      this.showErrorMessage = false;
    }, 5000);
  }

  cancelEdit(): void {
    this.router.navigate(['/profile']);
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      // Handle file upload logic here
      console.log('File selected:', file.name);
      // You would typically upload to a server and update the avatar URL
      this.showMessage('Profile picture updated!', 'success');
    }
  }
}