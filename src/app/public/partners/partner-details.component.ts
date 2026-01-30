import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PartnerService, Partner } from '../../services/partner.service';

@Component({
  standalone: true,
  imports: [CommonModule],
  templateUrl: './partner-details.component.html',
  styleUrls: ['./partner-details.component.scss']
})
export class PartnerDetailComponent implements OnInit {
  partner: Partner | null = null;

  constructor(
    private route: ActivatedRoute,
    private partnerService: PartnerService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.partnerService.getPartnerById(id).subscribe(data => {
      this.partner = data;
    });
  }
}
