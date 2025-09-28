// src/app/event-details/event-details.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { EventService } from '../services/event.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-event-details',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ],
  providers: [DatePipe],
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent implements OnInit {
  event: any = null;
  isLoading = true;
  errorMessage: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router, // Added Router here
    private eventService: EventService,
    private authService: AuthService,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    const eventId = this.route.snapshot.paramMap.get('id');

    if (eventId) {
      this.eventService.getEventById(+eventId).subscribe({
        next: (eventData) => {
          this.event = eventData;
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Failed to load event:', err);
          this.errorMessage = 'Event not found or failed to load.';
          this.isLoading = false;
        }
      });
    } else {
      this.errorMessage = 'Invalid event ID.';
      this.isLoading = false;
    }
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  bookTicket() {
    if (!this.isLoggedIn()) {
      alert('Please log in to book a ticket.');
      this.router.navigate(['/login']);
      return;
    }
    
    if (this.event && this.event.id) {
      alert(`Booking ticket for: ${this.event.title}`);
      this.router.navigate(['/ticket-booking', this.event.id]);
    }
  }
}