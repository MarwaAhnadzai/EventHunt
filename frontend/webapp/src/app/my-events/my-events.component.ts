import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-my-events',
  standalone: true,
  imports: [CommonModule, RouterModule], 
  templateUrl: './my-events.component.html',
  styleUrls: ['./my-events.component.css']
})
export class MyEventsComponent {
  myEvents: any[] = []; 

  constructor() {
    // Example data for testing
    this.myEvents = [
      { id: 1, title: 'Test Event', description: 'Demo', date: new Date() }
    ];
  }

  deleteEvent(eventId: number) {
    console.log('Deleting event:', eventId);
    this.myEvents = this.myEvents.filter(event => event.id !== eventId);
  }
}
