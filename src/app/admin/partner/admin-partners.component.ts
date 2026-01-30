import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PartnerService } from '../core/services/partner.service';

@Component({
  selector: 'app-admin-partners',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-partners.component.html'
})
export class AdminPartnersComponent implements OnInit {
  partners: any[] = [];
  isLoading = true;
  errorMessage = '';

  constructor(private partnerService: PartnerService) {}

  ngOnInit() {
    this.loadPartners();
  }

  loadPartners() {
    this.isLoading = true;
    this.partnerService.getPartners().subscribe({
      next: data => { this.partners = data; this.isLoading = false; },
      error: () => { this.errorMessage = 'Erreur lors du chargement des partenaires'; this.isLoading = false; }
    });
  }

  deletePartner(id: string) {
    if (confirm('Supprimer ce partenaire ?')) {
      this.partnerService.deletePartner(id).subscribe({
        next: () => this.loadPartners(),
        error: () => alert('Erreur lors de la suppression')
      });
    }
  }
}
