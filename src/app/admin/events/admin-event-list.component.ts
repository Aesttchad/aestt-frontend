import { Component, OnInit } from '@angular/core';
import { AdminEventService, Event } from '../core/services/admin-event.service';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-admin-event-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-event-list.component.html',
  styleUrls: ['./admin-event-list.component.scss']
})
export class AdminEventListComponent implements OnInit {
  events: Event[] = [];
  isLoading = true;
  errorMessage = '';

  constructor(private eventService: AdminEventService, private router: Router) {}

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents() {
    this.isLoading = true;
    this.eventService.getEvents().subscribe({
      next: data => {
        this.events = data;
        this.isLoading = false;
      },
      error: err => {
        this.errorMessage = 'Impossible de charger les événements';
        this.isLoading = false;
      }
    });
  }

  deleteEvent(id: string) {
    if (confirm('Voulez-vous vraiment supprimer cet événement ?')) {
      this.eventService.deleteEvent(id).subscribe({
        next: () => this.loadEvents(),
        error: () => alert('Erreur lors de la suppression')
      });
    }
  }
}
