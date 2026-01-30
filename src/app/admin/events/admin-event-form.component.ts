import { Component, OnInit } from '@angular/core';
import { AdminEventService, Event } from '../core/services/admin-event.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-event-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-event-form.component.html',
  styleUrls: ['./admin-event-form.component.scss']
})
export class AdminEventFormComponent implements OnInit {
  event: Event = { title: '', description: '', date: '', status: 'à venir' };
  isEdit = false;
  isLoading = false;
  errorMessage = '';
  imageFile?: File;

  constructor(private eventService: AdminEventService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.eventService.getEventById(id).subscribe({
        next: data => this.event = data,
        error: () => this.errorMessage = "Événement non trouvé"
      });
    }
  }

  onFileChange(event: any) {
    this.imageFile = event.target.files[0];
  }

  submit() {
    this.isLoading = true;
    if (this.imageFile) this.event.image = this.imageFile;

    const request = this.isEdit 
      ? this.eventService.updateEvent(this.event._id!, this.event) 
      : this.eventService.createEvent(this.event);

    request.subscribe({
      next: () => this.router.navigate(['/admin/events']),
      error: err => {
        this.errorMessage = 'Erreur lors de l\'enregistrement';
        this.isLoading = false;
      }
    });
  }
}
