import { Component, OnInit } from '@angular/core';
import { EventService, Event } from '../../services/event.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {
  upcomingEvents: Event[] = [];
  pastEvents: Event[] = [];
  isLoading = true;
  errorMessage = '';

  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    this.eventService.getEvents().subscribe({
      next: (events) => {
        const now = new Date();
        this.upcomingEvents = events.filter(e => new Date(e.date) >= now);
        this.pastEvents = events.filter(e => new Date(e.date) < now);
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Impossible de charger les événements';
        this.isLoading = false;
      }
    });
  }
}
