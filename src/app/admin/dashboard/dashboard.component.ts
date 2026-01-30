import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminArticleService } from '../core/services/admin-article.service';
import { AdminEventService } from '../core/services/admin-event.service';
import { PartnerService } from '../core/services/partner.service';
import { AdminMemberService } from '../core/services/admin-member.service';
import { AdminMessageService, Message } from '../core/services/admin-message.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  articlesCount = 0;
  eventsCount = 0;
  partnersCount = 0;
  membersCount = 0;
  unreadMessagesCount = 0;

  constructor(
    private articleService: AdminArticleService,
    private eventService: AdminEventService,
    private partnerService: PartnerService,
    private memberService: AdminMemberService,
    private messageService: AdminMessageService
  ) {}

  ngOnInit() {
    this.loadStats();
  }

  loadStats() {
    // Articles
    this.articleService.getAll().subscribe({
      next: res => this.articlesCount = res.length,
      error: err => console.error('Erreur articles:', err)
    });

    // Events
    this.eventService.getEvents().subscribe({
      next: res => this.eventsCount = res.length,
      error: err => console.error('Erreur events:', err)
    });

  

    // Members
    this.memberService.getAll().subscribe({
      next: res => this.membersCount = res.length,
      error: err => console.error('Erreur members:', err)
    });

   
   this.partnerService.getPartners().subscribe({
      next: res => this.partnersCount = res.length,
      error: err => console.error('Erreur partenaires:', err)
    });
    // Messages non lus
    this.messageService.getMessages().subscribe({
      next: (res: Message[]) => {
        this.unreadMessagesCount = res.filter(m => !m.isRead).length;
      },
      error: err => console.error('Erreur messages:', err)
    });
  }
}