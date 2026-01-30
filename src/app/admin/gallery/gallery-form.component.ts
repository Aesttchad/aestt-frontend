import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminGalleryService } from '../core/services/admin-gallery.service';

@Component({
  selector: 'app-gallery-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './gallery-form.component.html',
  styleUrls: ['./gallery-form.component.scss']
})
export class GalleryFormComponent {
  title = '';
  description = '';
  images: File[] = [];

  constructor(
    private service: AdminGalleryService,
    private router: Router
  ) {}

  onFilesSelected(event: any) {
    this.images = Array.from(event.target.files);
  }

  submit() {
    const formData = new FormData();
    formData.append('title', this.title);
    formData.append('description', this.description);

    this.images.forEach(img => {
      formData.append('images', img);
    });

    this.service.create(formData).subscribe(() => {
      this.router.navigate(['/admin/gallery']);
    });
  }
}
