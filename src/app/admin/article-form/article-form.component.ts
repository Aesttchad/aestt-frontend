import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminArticleService } from '../core/services/admin-article.service';

@Component({
  selector: 'app-article-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './article-form.component.html',
  styleUrls: ['./article-form.component.scss']
})
export class ArticleFormComponent {

  article = {
    title: '',
    content: '',
    author: 'Admin',
    status: 'brouillon' as 'brouillon' | 'publié',
    category: ''
  };

  constructor(
    private articleService: AdminArticleService,
    private router: Router
  ) {}

  submit() {
    this.articleService.create(this.article).subscribe({
      next: () => {
        this.router.navigate(['/admin/articles']);
      },
      error: (err) => {
        console.error(err);
        alert('Erreur lors de la création de l’article');
      }
    });
  }
}
