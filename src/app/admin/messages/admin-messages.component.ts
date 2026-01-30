import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminMessageService, Message } from '../core/services/admin-message.service';

@Component({
  selector: 'app-admin-messages',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-messages.component.html',
  styleUrls: ['./admin-messages.component.scss']
})
export class AdminMessagesComponent implements OnInit {
  messages: Message[] = [];
  isLoading = true;
  errorMessage = '';

  constructor(private messageService: AdminMessageService) {}

  ngOnInit(): void {
    this.loadMessages();
  }

  // Charger tous les messages
  loadMessages() {
    this.isLoading = true;
    this.errorMessage = '';
    this.messageService.getMessages().subscribe({
      next: (data) => {
        this.messages = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = err?.error?.message || 'Impossible de charger les messages';
        this.isLoading = false;
      }
    });
  }

  // Marquer un message comme lu
  markRead(msg: Message) {
    if (msg.isRead) return;
    this.messageService.markAsRead(msg._id!).subscribe({
      next: () => { msg.isRead = true; },
      error: () => alert('Impossible de marquer comme lu')
    });
  }

  // Supprimer un message
  delete(id: string) {
    if (!confirm('Supprimer ce message ?')) return;
    this.messageService.deleteMessage(id).subscribe({
      next: () => { this.messages = this.messages.filter(m => m._id !== id); },
      error: () => alert('Impossible de supprimer le message')
    });
  }
}
