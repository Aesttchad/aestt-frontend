import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Member } from '../../../services/member.service';
import { environment } from '../../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AdminMemberService {
  private apiUrl = `${environment.apiUrl}/members`;


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

  getAll(): Observable<Member[]> {
    return this.http.get<Member[]>(this.apiUrl, this.authHeaders());
  }

  update(id: string, data: Partial<Member>): Observable<Member> {
    return this.http.put<Member>(`${this.apiUrl}/${id}`, data, this.authHeaders());
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, this.authHeaders());
  }
}
