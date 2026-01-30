import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PartnerService {
  private apiUrl = `${environment.apiUrl}/partners`;


  constructor(private http: HttpClient) {}

  private getAuthHeaders() {
    const token = localStorage.getItem('admin') ? JSON.parse(localStorage.getItem('admin')!).token : '';
    return { headers: new HttpHeaders({ Authorization: `Bearer ${token}` }) };
  }

  getPartners(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getPartnerById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  createPartner(data: FormData): Observable<any> {
    return this.http.post(this.apiUrl, data, this.getAuthHeaders());
  }

  updatePartner(id: string, data: FormData): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, data, this.getAuthHeaders());
  }

  deletePartner(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, this.getAuthHeaders());
  }
}
