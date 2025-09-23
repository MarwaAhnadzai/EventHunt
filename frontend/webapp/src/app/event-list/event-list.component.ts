import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-event-list',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule, RouterModule],
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {
  events: any[] = [];
  filteredEvents: any[] = [];

  searchQuery: string = '';
  selectedCategory = '';
  selectedSort = '';
  fromDate?: string;
  toDate?: string;

  categories: string[] = [
    "CONFERENCE", "SEMINAR", "NETWORKING", "FESTIVAL",
    "MUSIC", "ARTS", "SPORTS", "TECHNOLOGY"
  ];

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.http.get<any[]>('/api/events').subscribe({
      next: (data) => {
        console.log('Events loaded:', data);
        this.events = data;
        this.filteredEvents = data;
      },
      error: (err) => {
        console.error('Error loading events:', err);
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

    // Sorting
    if (this.selectedSort === 'date') {
      this.filteredEvents.sort((a, b) =>
        new Date(a.date).getTime() - new Date(b.date).getTime()
      );
    }
  }

  resetFilters(): void {
    this.searchQuery = '';
    this.selectedCategory = '';
    this.selectedSort = '';
    this.fromDate = '';
    this.toDate = '';
    this.filteredEvents = [...this.events];
  }

  // ✅ Add this method for navigation
  goToEvent(eventId: number): void {
    this.router.navigate(['/events', eventId]);
  }
}
