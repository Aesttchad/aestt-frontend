import { Component, OnInit } from '@angular/core';
import { ArticleService, Article } from '../../services/article.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-articles',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit {
  articles: Article[] = [];
  isLoading = true;
  errorMessage = '';

  constructor(private articleService: ArticleService) {}

  ngOnInit(): void {
    this.articleService.getArticles().subscribe({
      next: (data) => {
        this.articles = data.filter(a => a.status === 'publié'); // seulement les publiés
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'Impossible de charger les articles';
        this.isLoading = false;
      }
    });
  }
}
