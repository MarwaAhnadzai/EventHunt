// src/app/home/home.component.ts
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { EventService } from '../services/event.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule, 
    FormsModule,
    MatCardModule,
    MatButtonModule
  ],
  providers: [DatePipe],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  events: any[] = [];
  isLoading = true;
  errorMessage: string | null = null;
  searchQuery: string = '';

  constructor(
    private eventService: EventService, 
    private router: Router,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents(): void {
    this.isLoading = true;
    this.eventService.getEvents().subscribe({
      next: (data) => {
        this.events = data.slice(0, 6);
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Failed to load events:', err);
        this.errorMessage = '⚠️ Could not load events. Please try again later.';
        this.isLoading = false;
      }
    });
  }

  searchEvents(): void {
    if (!this.searchQuery.trim()) {
      this.loadEvents();
      return;
    }
    
    this.isLoading = true;
    this.eventService.searchEvents(this.searchQuery).subscribe({
      next: (data) => {
        this.events = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Search failed:', err);
        this.errorMessage = '⚠️ Could not search events. Please try again later.';
        this.isLoading = false;
      }
    });
  }

  goToBrowseEvents(): void {
    this.router.navigate(['/events']);
  }

  goToEventDetails(eventId: number): void {
    this.router.navigate(['/event-details', eventId]);
  }
}