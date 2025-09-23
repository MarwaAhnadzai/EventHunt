import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-event',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css']
})
export class CreateEventComponent {
  title = '';
  description = '';
  date: string = '';

  onCreateEvent() {
    console.log('Event Created:', {
      title: this.title,
      description: this.description,
      date: this.date
    });
  }
}
