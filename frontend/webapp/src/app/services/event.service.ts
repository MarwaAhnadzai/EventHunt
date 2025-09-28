import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private apiUrl = 'http://localhost:5000/api/events';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  private getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Fetch all events (with optional filters)
  getEvents(params?: any): Observable<any> {
    let httpParams = new HttpParams();
    if (params) {
      Object.keys(params).forEach(key => {
        if (params[key]) {
          httpParams = httpParams.set(key, params[key].toString());
        }
      });
    }
    return this.http.get(this.apiUrl, { params: httpParams });
  }

  // Get single event by ID
  getEventById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  // Create new event
  createEvent(eventData: any): Observable<any> {
    return this.http.post(this.apiUrl, eventData, {
      headers: this.getAuthHeaders()
    });
  }

  // Update event
  updateEvent(eventId: number, eventData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${eventId}`, eventData, {
      headers: this.getAuthHeaders()
    });
  }

  // Delete event
  deleteEvent(eventId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${eventId}`, {
      headers: this.getAuthHeaders()
    });
  }

  // Get events by organizer
  getEventsByOrganizer(organizerId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/organizer/${organizerId}`, {
      headers: this.getAuthHeaders()
    });
  }

  // Search events
  searchEvents(searchQuery: string): Observable<any> {
    const params = new HttpParams().set('search', searchQuery);
    return this.http.get(this.apiUrl, { params });
  }
}