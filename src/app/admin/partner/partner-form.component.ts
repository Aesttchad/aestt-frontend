import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PartnerService } from '../core/services/partner.service';

@Component({
  selector: 'app-partner-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './partner-form.component.html'
})
export class PartnerFormComponent implements OnInit {
  partner: any = { name: '', description: '', website: '', logo: '', category: 'institution' };
  isEdit = false;
  partnerId!: string;
  logoFile?: File;
  errorMessage = '';

  constructor(private partnerService: PartnerService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.partnerId = this.route.snapshot.params['id'];
    if (this.partnerId) {
      this.isEdit = true;
      this.partnerService.getPartnerById(this.partnerId).subscribe({
        next: data => this.partner = data,
        error: () => this.errorMessage = 'Impossible de récupérer le partenaire'
      });
    }
  }

  onFileChange(event: any) {
    this.logoFile = event.target.files[0];
  }

  submit() {
    const formData = new FormData();
    formData.append('name', this.partner.name);
    formData.append('description', this.partner.description);
    formData.append('website', this.partner.website);
    formData.append('category', this.partner.category);
    if (this.logoFile) formData.append('logo', this.logoFile);

    const request = this.isEdit
      ? this.partnerService.updatePartner(this.partnerId, formData)
      : this.partnerService.createPartner(formData);

    request.subscribe({
      next: () => this.router.navigate(['/admin/partners']),
      error: () => this.errorMessage = 'Erreur lors de l\'enregistrement'
    });
  }
}
