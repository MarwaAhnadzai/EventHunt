import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EventService {
  private apiUrl = '/api/events';

  constructor(private http: HttpClient) {}

  getEvents(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  addEvent(eventData: any): Observable<any> {
    return this.http.post(this.apiUrl, eventData);
  }
  getEventsByOrganizer(organizerId: string) {
  return this.http.get(`/api/events/organizer/${organizerId}`);
}

deleteEvent(eventId: number) {
  return this.http.delete(`/api/events/${eventId}`);
}
createEvent(eventData: any) {
  return this.http.post('/api/events', eventData);
}


}
