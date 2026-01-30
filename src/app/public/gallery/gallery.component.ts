import { Component, OnInit } from '@angular/core';
import { GalleryService, Gallery } from '../../services/gallery.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {
  galleries: Gallery[] = [];
  isLoading = true;
  errorMessage = '';

  constructor(private galleryService: GalleryService) {}

  ngOnInit(): void {
    this.galleryService.getGalleries().subscribe({
      next: (data) => {
        this.galleries = data;
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'Impossible de charger les galeries';
        this.isLoading = false;
      }
    });
  }
}
