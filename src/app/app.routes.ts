import { Routes } from '@angular/router';

// ================= LAYOUTS =================
import { LayoutComponent } from './public/layout/layout.component';
import { AdminLayoutComponent } from './admin/layout/layout.component';

// ================= PUBLIC COMPONENTS =================
import { HomeComponent } from './public/home/home.component';
import { AboutComponent } from './public/about/about.component';
import { ContactComponent } from './public/contact/contact.component';
import { ArticlesComponent } from './public/articles/articles.component';
import { ArticleDetailComponent } from './public/article-detail/article-detail.component';
import { GalleryComponent } from './public/gallery/gallery.component';
import { GalleryDetailComponent } from './public/gallery-detail/gallery-detail.component';
import { EventsComponent } from './public/events/events.component';
import { EventDetailComponent } from './public/event-detail/event-detail.component';
import { PartnerDetailComponent } from './public/partners/partner-details.component';
import { StudentInfoComponent } from './public/student-info/student-info.component';
import { JoinComponent } from './public/join/join.component';

// ================= ADMIN COMPONENTS =================
import { LoginComponent } from './admin/login/login.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';

// Articles
import { AdminArticlesComponent } from './admin/articles/articles.component';
import { ArticleFormComponent } from './admin/article-form/article-form.component';

// Events
import { AdminEventListComponent } from './admin/events/admin-event-list.component';
import { AdminEventFormComponent } from './admin/events/admin-event-form.component';

// Partners
import { AdminPartnersComponent } from './admin/partner/admin-partners.component';
import { PartnerFormComponent } from './admin/partner/partner-form.component';

// Gallery
import { AdminGalleryComponent } from './admin/gallery/admin-gallery.component';
import { GalleryFormComponent } from './admin/gallery/gallery-form.component';

// Student Info
import { AdminStudentInfoComponent } from './admin/student-info/admin-student-info.component';
import { StudentInfoFormComponent } from './admin/student-info/student-info-form.component';

// Members & Messages
import { AdminMembersComponent } from './admin/member/admin-members.component';
import { AdminMessagesComponent } from './admin/messages/admin-messages.component';

// ================= GUARD =================
import { AuthGuard } from './admin/core/services/authGuard';

// ================= ROUTES =================
export const routes: Routes = [

  // ========== PUBLIC ==========
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'about', component: AboutComponent },
      { path: 'contact', component: ContactComponent },

      { path: 'articles', component: ArticlesComponent },
      { path: 'articles/:id', component: ArticleDetailComponent },

      { path: 'gallery', component: GalleryComponent },
      { path: 'gallery/:id', component: GalleryDetailComponent },

      { path: 'evenements', component: EventsComponent },
      { path: 'evenements/:id', component: EventDetailComponent },

      { path: 'partner', component: PartnerDetailComponent },

      { path: 'espace-etudiants', component: StudentInfoComponent },
      { path: 'adhesion', component: JoinComponent }
    ]
  },

  // ========== ADMIN LOGIN ==========
  { path: 'admin/login', component: LoginComponent },

  // ========== ADMIN ==========
  {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivate: [AuthGuard],
    children: [

      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },

      // ===== ARTICLES =====
      { path: 'articles', component: AdminArticlesComponent },
      { path: 'articles/new', component: ArticleFormComponent },
      { path: 'articles/edit/:id', component: ArticleFormComponent },

      // ===== EVENTS =====
      { path: 'events', component: AdminEventListComponent },
      { path: 'events/new', component: AdminEventFormComponent },
      { path: 'events/edit/:id', component: AdminEventFormComponent },

      // ===== PARTNERS =====
      { path: 'partners', component: AdminPartnersComponent },
      { path: 'partners/new', component: PartnerFormComponent },
      { path: 'partners/edit/:id', component: PartnerFormComponent },

      // ===== GALLERY =====
      { path: 'gallery', component: AdminGalleryComponent },
      { path: 'gallery/new', component: GalleryFormComponent },
      { path: 'gallery/edit/:id', component: GalleryFormComponent },

      // ===== STUDENT INFO =====
      { path: 'student-info', component: AdminStudentInfoComponent },
      { path: 'student-info/new', component: StudentInfoFormComponent },
      { path: 'student-info/edit/:id', component: StudentInfoFormComponent },

      // ===== MEMBERS =====
      { path: 'members', component: AdminMembersComponent },

      // ===== MESSAGES =====
      { path: 'messages', component: AdminMessagesComponent }
    ]
  },

  // ========== FALLBACK ==========
  { path: '**', redirectTo: '' }
];
