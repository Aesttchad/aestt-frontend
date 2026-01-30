import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Gallery {
  _id: string;
  title: string;
  description?: string;
  images: string[];
  createdAt: string;
  updatedAt: string;
}

@Injectable({
  providedIn: 'root'
})
export class GalleryService {
private apiUrl = `${environment.apiUrl}/galleries`;

  constructor(private http: HttpClient) {}

  getGalleries(): Observable<Gallery[]> {
    return this.http.get<Gallery[]>(this.apiUrl);
  }

  getGalleryById(id: string): Observable<Gallery> {
    return this.http.get<Gallery>(`${this.apiUrl}/${id}`);
  }

  createGallery(formData: FormData): Observable<Gallery> {
    return this.http.post<Gallery>(this.apiUrl, formData);
  }

  deleteGallery(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
