import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

export interface Event {
  _id?: string;
  title: string;
  description: string;
  location?: string;
  date: string;
  image?: string | File;
  status?: 'à venir' | 'passé';
  category?: string;
  createdAt?: string;
  updatedAt?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AdminEventService {
  private apiUrl = `${environment.apiUrl}/events`;


  constructor(private http: HttpClient) {}

  private getAuthHeaders() {
    const token = localStorage.getItem('admin') 
      ? JSON.parse(localStorage.getItem('admin')!).token 
      : '';
    return { headers: new HttpHeaders({ Authorization: `Bearer ${token}` }) };
  }

  getEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(this.apiUrl, this.getAuthHeaders());
  }

  getEventById(id: string): Observable<Event> {
    return this.http.get<Event>(`${this.apiUrl}/${id}`, this.getAuthHeaders());
  }

  createEvent(event: Event): Observable<Event> {
    const formData = new FormData();
    for (const key in event) {
      const value = event[key as keyof Event];
      if (value !== undefined && value !== null) {
        formData.append(key, value instanceof File ? value : value.toString());
      }
    }
    return this.http.post<Event>(this.apiUrl, formData, this.getAuthHeaders());
  }

  updateEvent(id: string, event: Event): Observable<Event> {
    const formData = new FormData();
    for (const key in event) {
      const value = event[key as keyof Event];
      if (value !== undefined && value !== null) {
        formData.append(key, value instanceof File ? value : value.toString());
      }
    }
    return this.http.put<Event>(`${this.apiUrl}/${id}`, formData, this.getAuthHeaders());
  }

  deleteEvent(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, this.getAuthHeaders());
  }
}
