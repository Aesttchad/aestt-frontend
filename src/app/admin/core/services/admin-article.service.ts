import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Article } from '../../../services/article.service';

@Injectable({
  providedIn: 'root'
})
export class AdminArticleService {
  private apiUrl = 'http://localhost:5000/api/articles';

  constructor(private http: HttpClient) {}

  private getAuthHeaders() {
    const admin = localStorage.getItem('admin');
    const token = admin ? JSON.parse(admin).token : '';

    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    };
  }

  // 📋 Tous les articles (admin)
  getAll(): Observable<Article[]> {
    return this.http.get<Article[]>(this.apiUrl, this.getAuthHeaders());
  }

  // ➕ Créer
  create(article: Partial<Article>): Observable<Article> {
    return this.http.post<Article>(this.apiUrl, article, this.getAuthHeaders());
  }

  // ✏️ Modifier
  update(id: string, article: Partial<Article>): Observable<Article> {
    return this.http.put<Article>(
      `${this.apiUrl}/${id}`,
      article,
      this.getAuthHeaders()
    );
  }

  // 🗑️ Supprimer
  delete(id: string): Observable<any> {
    return this.http.delete(
      `${this.apiUrl}/${id}`,
      this.getAuthHeaders()
    );
  }
}
