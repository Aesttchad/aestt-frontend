import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdminGalleryService } from '../core/services/admin-gallery.service';
import { Gallery } from '../../services/gallery.service';

@Component({
  selector: 'app-admin-gallery',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-gallery.component.html',
  styleUrls: ['./admin-gallery.component.scss']
})
export class AdminGalleryComponent implements OnInit {
  galleries: Gallery[] = [];
  isLoading = true;

  constructor(private service: AdminGalleryService) {}

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.service.getAll().subscribe(data => {
      this.galleries = data;
      this.isLoading = false;
    });
  }

  delete(id: string) {
    if (!confirm('Supprimer cette galerie ?')) return;

    this.service.delete(id).subscribe(() => {
      this.galleries = this.galleries.filter(g => g._id !== id);
    });
  }
}
