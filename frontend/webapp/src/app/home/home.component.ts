import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Event {
  id: number;
  title: string;
  eventName?: string;
  date: string;
  eventAddress?: {
    city?: string;
    province?: string;
  };
  imageUrl?: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  events: Event[] = [];
  isLoading = true;
  errorMessage: string | null = null;
  searchQuery: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents(): void {
    this.isLoading = true;
    this.http.get<Event[]>('http://localhost:5000/api/events').subscribe({
      next: (data) => {
        this.events = data.slice(0, 4);
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
    this.http.get<Event[]>(`http://localhost:5000/api/events?search=${this.searchQuery}`).subscribe({
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
}
