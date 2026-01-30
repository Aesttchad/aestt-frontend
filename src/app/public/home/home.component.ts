import {
  Component,
  OnInit,
  AfterViewInit,
  ElementRef,
  ViewChild
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { forkJoin } from 'rxjs';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';
import { environment } from '../../../environments/environment';

/* =====================
   Interfaces
===================== */
interface Article {
  _id: string;
  title: string;
  content?: string;
  image?: string;
}

interface Event {
  _id: string;
  title: string;
  date: string;
  location: string;
  image?: string;
}

interface Partner {
  _id: string;
  name: string;
  logo: string;
}

interface Agent {
  fullName: string;
  role: string;
  photo?: string;
  email?: string;
  phone?: string;
}

/* =====================
   Component
===================== */
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {

  /* ===== HERO VIDEO ===== */
  @ViewChild('heroVideo') heroVideo!: ElementRef<HTMLVideoElement>;

  /* ===== DATA ===== */
  articles: Article[] = [];
  events: Event[] = [];
  partners: Partner[] = [];
  bureau: Agent[] = [];

  /* ===== UI STATES ===== */
  isLoading = true;
  errorMessage = '';

  /* ===== CONTACT FORM ===== */
  contactForm: FormGroup;
  isSubmitting = false;
  successMessage = '';
  errorMessageForm = '';

  /* ===== EVENTS CAROUSEL ===== */
  activeIndex = 0;
  private eventInterval: any;

  constructor(
    private http: HttpClient,
    private fb: FormBuilder
  ) {
    this.contactForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      subject: [''],
      message: ['', Validators.required]
    });
  }

  /* =====================
     LIFECYCLE
  ===================== */
  ngOnInit(): void {
    this.loadData();
  }

  ngAfterViewInit(): void {
    // Fix autoplay vidéo (desktop + mobile)
    if (this.heroVideo) {
      const video = this.heroVideo.nativeElement;
      video.muted = true;
      video.play().catch(() => {
        video.setAttribute('muted', '');
        video.play();
      });
    }
  }

  /* =====================
     LOAD DATA
  ===================== */
  loadData(): void {
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

        // Auto slide events
        if (this.events.length > 1) {
          this.startEventSlider();
        }
      },
      error: (err) => {
        console.error('Erreur API:', err);
        this.errorMessage = 'Impossible de charger les données.';
        this.isLoading = false;
      }
    });
  }

  /* =====================
     EVENTS SLIDER
  ===================== */
  startEventSlider(): void {
    clearInterval(this.eventInterval);
    this.eventInterval = setInterval(() => {
      this.nextEvent();
    }, 5000);
  }

  nextEvent(): void {
    if (!this.events.length) return;
    this.activeIndex = (this.activeIndex + 1) % this.events.length;
  }

  prevEvent(): void {
    if (!this.events.length) return;
    this.activeIndex =
      (this.activeIndex - 1 + this.events.length) % this.events.length;
  }

  /* =====================
     CONTACT FORM
  ===================== */
  onSubmitContact(): void {
    if (this.contactForm.invalid) return;

    this.isSubmitting = true;
    this.successMessage = '';
    this.errorMessageForm = '';

    this.http
      .post(`${environment.apiUrl}/messages`, this.contactForm.value)
      .subscribe({
        next: (res: any) => {
          this.successMessage =
            res?.message || 'Message envoyé avec succès !';
          this.contactForm.reset();
          this.isSubmitting = false;
        },
        error: (err) => {
          console.error('Erreur envoi message:', err);
          this.errorMessageForm =
            'Impossible d’envoyer le message. Veuillez réessayer.';
          this.isSubmitting = false;
        }
      });
  }
}
