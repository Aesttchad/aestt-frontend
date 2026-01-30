import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Gallery } from '../../../services/gallery.service';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminGalleryService {
  private apiUrl = `${environment.apiUrl}/galleries`;


  constructor(private http: HttpClient) {}

  private authHeaders() {
    const admin = localStorage.getItem('admin');
    const token = admin ? JSON.parse(admin).token : '';

    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    };
  }

  getAll(): Observable<Gallery[]> {
    return this.http.get<Gallery[]>(this.apiUrl, this.authHeaders());
  }

  create(formData: FormData): Observable<Gallery> {
    return this.http.post<Gallery>(this.apiUrl, formData, this.authHeaders());
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, this.authHeaders());
  }
}
