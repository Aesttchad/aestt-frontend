import { Component, OnInit } from '@angular/core';
import { PartnerService, Partner } from '../../services/partner.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-partners',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './partners.component.html',
  styleUrls: ['./partners.component.scss']
})
export class PartnersComponent implements OnInit {
  partners: Partner[] = [];
  isLoading = true;
  errorMessage = '';

  constructor(private partnerService: PartnerService) {}

  ngOnInit(): void {
    this.partnerService.getPartners().subscribe({
      next: (data) => {
        this.partners = data;
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'Impossible de charger les partenaires';
        this.isLoading = false;
      }
    });
  }
}
