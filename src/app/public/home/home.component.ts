import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { forkJoin } from 'rxjs';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

interface Article { _id: string; title: string; content?: string; image?: string; }
interface Event { _id: string; title: string; date: string; location: string; image?: string; }
interface Partner { _id: string; name: string; logo: string; }
interface Agent { fullName: string; role: string; photo?: string; email?: string; phone?: string; }

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  articles: Article[] = [];
  events: Event[] = [];
  partners: Partner[] = [];
  bureau: Agent[] = [];

  isLoading = true;
  errorMessage = '';

  // === Formulaire contact ===
  contactForm: FormGroup;
  isSubmitting = false;
  successMessage = '';
  errorMessageForm = '';

  // === Events un à la fois ===
  activeIndex = 0;

  constructor(private http: HttpClient, private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      subject: [''],
      message: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    forkJoin({
      articles: this.http.get<Article[]>('http://localhost:5000/api/articles?limit=3'),
      events: this.http.get<Event[]>('http://localhost:5000/api/events'),
      partners: this.http.get<Partner[]>('http://localhost:5000/api/partners'),
      bureau: this.http.get<Agent[]>('http://localhost:5000/api/agents')
    }).subscribe({
      next: ({ articles, events, partners, bureau }) => {
        const now = new Date();
        this.articles = articles ?? [];
        this.events = (events ?? []).filter(e => new Date(e.date) >= now);
        this.partners = partners ?? [];
        this.bureau = bureau ?? [];
        this.isLoading = false;

        // Auto-slide toutes les 5 secondes
        if (this.events.length > 1) {
          setInterval(() => this.nextEvent(), 5000);
        }
      },
      error: () => {
        this.errorMessage = 'Impossible de charger les données.';
        this.isLoading = false;
      }
    });
  }

  // === Navigation Events ===
  nextEvent() {
    if (this.events.length === 0) return;
    this.activeIndex = (this.activeIndex + 1) % this.events.length;
  }

  prevEvent() {
    if (this.events.length === 0) return;
    this.activeIndex = (this.activeIndex - 1 + this.events.length) % this.events.length;
  }

  // === Méthode envoi message ===
  onSubmitContact() {
    if (this.contactForm.invalid) return;

    this.isSubmitting = true;
    this.successMessage = '';
    this.errorMessageForm = '';

    this.http.post('http://localhost:5000/api/messages', this.contactForm.value)
      .subscribe({
        next: (res: any) => {
          this.successMessage = res.message || 'Message envoyé avec succès !';
          this.contactForm.reset();
          this.isSubmitting = false;
        },
        error: (err) => {
          console.error(err);
          this.errorMessageForm = 'Impossible d’envoyer le message. Veuillez réessayer.';
          this.isSubmitting = false;
        }
      });
  }
}
