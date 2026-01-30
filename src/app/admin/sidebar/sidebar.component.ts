import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav class="sidebar">
      <h2>AESTT</h2>
      <ul>
        <li><a routerLink="/admin">Dashboard</a></li>
        <li><a routerLink="/admin/articles">Articles</a></li>
        <li><a routerLink="/admin/events">Événements</a></li>
        <li><a routerLink="/admin/partners">Partenaires</a></li>
        <li><a routerLink="/admin/members">adhesion membres</a></li>
        <li><a routerLink="/admin/messages">messages</a></li>
        <li><a routerLink="/admin/gallery">gallerie</a></li>
        <li><a routerLink="/admin/student-info">espace etudiant</a></li>
      </ul>
    </nav>
  `,
  styleUrls: ['./sidebar.component.scss']
})
export class AdminSidebarComponent {}
