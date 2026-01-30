import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
export interface Message {
  _id?: string;
  fullName: string;
  email: string;
  subject?: string;
  message: string;
  isRead?: boolean;
  createdAt?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AdminMessageService {
  private apiUrl = `${environment.apiUrl}/messages`;


  constructor(private http: HttpClient) {}

  // 🔐 HEADERS AVEC TOKEN (COMME EVENTS)
  private getAuthHeaders() {
    const admin = localStorage.getItem('admin');
    const token = admin ? JSON.parse(admin).token : '';

    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    };
  }

  // 📥 GET messages
  getMessages(): Observable<Message[]> {
    return this.http.get<Message[]>(this.apiUrl, this.getAuthHeaders());
  }

  // ✅ MARK AS READ (PROBLÈME ÉTAIT ICI)
  markAsRead(id: string): Observable<Message> {
    return this.http.put<Message>(
      `${this.apiUrl}/${id}/read`,
      {},
      this.getAuthHeaders()
    );
  }

  // 🗑️ DELETE
  deleteMessage(id: string): Observable<any> {
    return this.http.delete(
      `${this.apiUrl}/${id}`,
      this.getAuthHeaders()
    );
  }
}
