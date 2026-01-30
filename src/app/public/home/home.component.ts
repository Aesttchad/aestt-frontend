import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { forkJoin } from 'rxjs';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { environment } from '../../../environments/environment';

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

  contactForm: FormGroup;
  isSubmitting = false;
  successMessage = '';
  errorMessageForm = '';

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
    this.loadData();
  }

  loadData() {
    this.isLoading = true;
    forkJoin({
      articles: this.http.get<Article[]>(`${environment.apiUrl}/articles?limit=3`),
      events: this.http.get<Event[]>(`${environment.apiUrl}/events`),
      partners: this.http.get<Partner[]>(`${environment.apiUrl}/partners`),
      bureau: this.http.get<Agent[]>(`${environment.apiUrl}/agents`)
    }).subscribe({
      next: ({ articles, events, partners, bureau }) => {
        const now = new Date();
        this.articles = articles ?? [];
        this.events = (events ?? []).filter(e => new Date(e.date) >= now);
        this.partners = partners ?? [];
        this.bureau = bureau ?? [];
        this.isLoading = false;

        if (this.events.length > 1) {
          setInterval(() => this.nextEvent(), 5000);
        }
      },
      error: (err) => {
        console.error('Erreur API:', err);
        this.errorMessage = 'Impossible de charger les données.';
        this.isLoading = false;
      }
    });
  }

  // === Carousel Events ===
  nextEvent() {
    if (this.events.length === 0) return;
    this.activeIndex = (this.activeIndex + 1) % this.events.length;
  }

  prevEvent() {
    if (this.events.length === 0) return;
    this.activeIndex = (this.activeIndex - 1 + this.events.length) % this.events.length;
  }

  // === Formulaire contact ===
  onSubmitContact() {
    if (this.contactForm.invalid) return;

    this.isSubmitting = true;
    this.successMessage = '';
    this.errorMessageForm = '';

    this.http.post(`${environment.apiUrl}/messages`, this.contactForm.value)
      .subscribe({
        next: (res: any) => {
          this.successMessage = res.message || 'Message envoyé avec succès !';
          this.contactForm.reset();
          this.isSubmitting = false;
        },
        error: (err) => {
          console.error('Erreur envoi message:', err);
          this.errorMessageForm = 'Impossible d’envoyer le message. Veuillez réessayer.';
          this.isSubmitting = false;
        }
      });
  }
}
