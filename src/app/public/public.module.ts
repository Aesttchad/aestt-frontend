import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Import des composants PUBLIC
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

@NgModule({
  declarations: [
    HomeComponent,
    ArticlesComponent,
    ArticleDetailComponent,
    GalleryComponent,
    GalleryDetailComponent,
    EventsComponent,
    EventDetailComponent,
    PartnersComponent,
    StudentInfoComponent,
    ContactComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    HomeComponent,
    ArticlesComponent,
    ArticleDetailComponent,
    GalleryComponent,
    GalleryDetailComponent,
    EventsComponent,
    EventDetailComponent,
    PartnersComponent,
    StudentInfoComponent,
    ContactComponent
  ]
})
export class PublicModule {}
