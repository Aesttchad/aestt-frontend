import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ArticlesComponent } from './articles/articles.component';
import { ArticleDetailComponent } from './article-detail/article-detail.component';
import { GalleryComponent } from './gallery/gallery.component';
import { GalleryDetailComponent } from './gallery-detail/gallery-detail.component';
import { EventsComponent } from './events/events.component';
import { EventDetailComponent } from './event-detail/event-detail.component';
import { PartnersComponent } from './partners/partners.component';
import { StudentInfoComponent } from './student-info/student-info.component';
import { ContactComponent } from './contact/contact.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'articles', component: ArticlesComponent },
  { path: 'articles/:id', component: ArticleDetailComponent },
  { path: 'galerie', component: GalleryComponent },
  { path: 'galerie/:id', component: GalleryDetailComponent },
  { path: 'evenements', component: EventsComponent },
  { path: 'evenements/:id', component: EventDetailComponent },
  { path: 'partenaires', component: PartnersComponent },
  { path: 'espace-etudiants', component: StudentInfoComponent },
  { path: 'contact', component: ContactComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule {}
