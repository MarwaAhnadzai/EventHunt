// src/app/event-list/event-list.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { EventService } from '../services/event.service';

@Component({
  selector: 'app-event-list',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    MatInputModule,
    MatIconModule
  ],
  providers: [DatePipe],
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {
  events: any[] = [];
  filteredEvents: any[] = [];
  isLoading = true;

  searchQuery: string = '';
  selectedCategory = '';
  selectedSort = '';
  fromDate?: string;
  toDate?: string;

  categories: string[] = [
    "CONFERENCE", "SEMINAR", "NETWORKING", "FESTIVAL",
    "MUSIC", "ARTS", "SPORTS", "TECHNOLOGY"
  ];

  constructor(
    private eventService: EventService, 
    private router: Router,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents(): void {
    this.eventService.getEvents().subscribe({
      next: (data) => {
        this.events = data;
        this.filteredEvents = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading events:', err);
        this.isLoading = false;
      }
    });
  }

  applyFilters(): void {
    this.filteredEvents = this.events.filter(event => {
      const eventDate = new Date(event.date);

      const matchSearch = this.searchQuery
        ? event.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          event.description?.toLowerCase().includes(this.searchQuery.toLowerCase())
        : true;

      const matchCategory = this.selectedCategory
        ? event.category === this.selectedCategory
        : true;

      const matchFromDate = this.fromDate
        ? eventDate >= new Date(this.fromDate)
        : true;

      const matchToDate = this.toDate
        ? eventDate <= new Date(this.toDate)
        : true;

      return matchSearch && matchCategory && matchFromDate && matchToDate;
    });

    this.sortEvents();
  }

  sortEvents(): void {
    if (this.selectedSort === 'date') {
      this.filteredEvents.sort((a, b) => 
        new Date(a.date).getTime() - new Date(b.date).getTime()
      );
    } else if (this.selectedSort === 'title') {
      this.filteredEvents.sort((a, b) => a.title.localeCompare(b.title));
    }
  }

  resetFilters(): void {
    this.searchQuery = '';
    this.selectedCategory = '';
    this.selectedSort = '';
    this.fromDate = undefined;
    this.toDate = undefined;
    this.filteredEvents = [...this.events];
  }

  goToEvent(eventId: number): void {
    this.router.navigate(['/event-details', eventId]);
  }

  searchEvents(): void {
    if (this.searchQuery.trim()) {
      this.eventService.searchEvents(this.searchQuery).subscribe({
        next: (data) => {
          this.filteredEvents = data;
        },
        error: (err) => {
          console.error('Search failed:', err);
        }
      });
    } else {
      this.filteredEvents = [...this.events];
    }
  }
}