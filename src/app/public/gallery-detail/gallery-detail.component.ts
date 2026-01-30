import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GalleryService, Gallery } from '../../services/gallery.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-gallery-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './gallery-detail.component.html',
  styleUrls: ['./gallery-detail.component.scss']
})
export class GalleryDetailComponent implements OnInit {
  gallery: Gallery | null = null;
  isLoading = true;
  errorMessage = '';
  lightboxImg: string | null = null; // pour lightbox

  constructor(private route: ActivatedRoute, private galleryService: GalleryService) {}

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.errorMessage = 'ID de galerie invalide';
      this.isLoading = false;
      return;
    }

    id = id.trim(); // supprime espaces éventuels

    this.galleryService.getGalleryById(id).subscribe({
      next: (data) => {
        this.gallery = data;
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'Galerie non trouvée';
        this.isLoading = false;
      }
    });
  }

  // Ouvrir lightbox
  openLightbox(img: string) {
    this.lightboxImg = img;
  }

  // Fermer lightbox
  closeLightbox() {
    this.lightboxImg = null;
  }
}
