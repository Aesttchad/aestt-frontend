import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdminArticleService } from '../core/services/admin-article.service';
import { Article } from '../../services/article.service';

@Component({
  selector: 'app-admin-articles',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class AdminArticlesComponent implements OnInit {
  articles: Article[] = [];
  isLoading = true;

  constructor(private articleService: AdminArticleService) {}

  ngOnInit(): void {
    this.loadArticles();
  }

  loadArticles() {
    this.articleService.getAll().subscribe({
      next: (res) => {
        this.articles = res;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  deleteArticle(id: string) {
    if (confirm('Supprimer cet article ?')) {
      this.articleService.delete(id).subscribe(() => {
        this.loadArticles();
      });
    }
  }
}
