import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TicketService {
  private apiUrl = '/api/tickets';

  constructor(private http: HttpClient) {}

  bookTicket(ticketData: any): Observable<any> {
    return this.http.post(this.apiUrl, ticketData);
  }

  getTickets(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
}
