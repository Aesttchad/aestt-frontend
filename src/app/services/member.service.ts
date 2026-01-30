import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Member {
  _id?: string;
  fullName: string;
  university: string;
  fieldOfStudy: string;
  email: string;
  phone?: string;
  status?: 'en attente' | 'validé';
  joinedAt?: string;
}

@Injectable({
  providedIn: 'root'
})
export class MemberService {
private apiUrl = `${environment.apiUrl}/members`;

  constructor(private http: HttpClient) {}

  join(member: Member): Observable<Member> {
    return this.http.post<Member>(this.apiUrl, member);
  }
}
