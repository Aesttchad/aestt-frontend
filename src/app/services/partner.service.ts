import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Partner {
  _id?: string;
  name: string;
  logo?: string;
  description?: string;
  website?: string;
  createdAt?: string;
  updatedAt?: string;
}
@Injectable({
  providedIn: 'root'
})
export class PartnerService {
private apiUrl = `${environment.apiUrl}/partners`;

  constructor(private http: HttpClient) {}

  // 🌍 PUBLIC
  getPartners(): Observable<Partner[]> {
  return this.http.get<Partner[]>(this.apiUrl);
}

getPartnerById(id: string): Observable<Partner> {
  return this.http.get<Partner>(`${this.apiUrl}/${id}`);
}

  // 🔐 ADMIN
  createPartner(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  updatePartner(id: string, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

  deletePartner(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
