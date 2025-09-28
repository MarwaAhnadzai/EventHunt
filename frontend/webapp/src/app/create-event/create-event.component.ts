// src/app/create-event/create-event.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../services/auth.service';
import { EventService } from '../services/event.service';

@Component({
  selector: 'app-create-event',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatOptionModule,
    MatIconModule
  ],
  providers: [DatePipe],
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css']
})
export class CreateEventComponent {
  event = {
    title: '',
    description: '',
    date: '',
    location: '',
    category: '',
    maxAttendees: null as number | null
  };

  categories: string[] = [
    "CONFERENCE", "SEMINAR", "NETWORKING", "FESTIVAL",
    "MUSIC", "ARTS", "SPORTS", "TECHNOLOGY"
  ];

  isLoading = false;

  constructor(
    private authService: AuthService, 
    private eventService: EventService,
    private router: Router,
    private datePipe: DatePipe
  ) {}

  createEvent() {
    if (!this.authService.isLoggedIn()) {
      alert('You must be logged in to create an event.');
      this.router.navigate(['/login']);
      return;
    }

    if (!this.event.title || !this.event.date) {
      alert('Title and date are required.');
      return;
    }

    this.isLoading = true;

    const eventData = {
      ...this.event,
      date: new Date(this.event.date).toISOString()
    };

    this.eventService.createEvent(eventData).subscribe({
      next: (response) => {
        this.isLoading = false;
        alert('🎉 Event created successfully!');
        this.router.navigate(['/my-events']);
      },
      error: (err) => {
        this.isLoading = false;
        console.error('Event creation failed:', err);
        alert('Failed to create event: ' + (err.error?.error || 'Unknown error'));
      }
    });
  }
}