// src/app/profile/profile.component.ts
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../services/auth.service';
import { EventService } from '../services/event.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ],
  providers: [DatePipe],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: any = null;
  userEvents: any[] = [];
  isLoading = true;

  constructor(
    private router: Router, 
    private authService: AuthService,
    private eventService: EventService,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.user = this.authService.getCurrentUser();
    
    if (!this.user) {
      this.router.navigate(['/login']);
      return;
    }

    this.loadUserEvents();
  }

  loadUserEvents(): void {
    if (this.user && this.user.id) {
      this.eventService.getEventsByOrganizer(this.user.id).subscribe({
        next: (events) => {
          this.userEvents = events;
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Failed to load user events:', err);
          this.isLoading = false;
        }
      });
    } else {
      this.isLoading = false;
    }
  }

  editProfile() {
    this.router.navigate(['/profile-edit']);
  }

  goToCreateEvent() {
    this.router.navigate(['/create-event']);
  }

  deleteEvent(eventId: number) {
    if (confirm('Are you sure you want to delete this event?')) {
      this.eventService.deleteEvent(eventId).subscribe({
        next: () => {
          this.userEvents = this.userEvents.filter(event => event.id !== eventId);
          alert('Event deleted successfully!');
        },
        error: (err) => {
          console.error('Failed to delete event:', err);
          alert('Failed to delete event.');
        }
      });
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}