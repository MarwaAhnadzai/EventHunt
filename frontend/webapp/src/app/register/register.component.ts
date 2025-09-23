import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatCardModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username: string = '';
  email: string = '';
  password: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  onRegister(): void {
    const registerData = {
      username: this.username || this.email.split('@')[0], 
      email: this.email,
      password: this.password,
      role: 'EVENTHUNT_USER'
    };

	this.http.post('/api/auth/register', registerData, { responseType: 'text' })


      .subscribe({
        next: () => {
          alert('Registration successful!');
          this.router.navigate(['/login']);
        },
		error: (err) => {
		  console.error('Registration failed:', err);
		  alert('Registration failed: ' + (err.error?.message || err.message || 'Unknown error'));
		}

      });
  }
}
