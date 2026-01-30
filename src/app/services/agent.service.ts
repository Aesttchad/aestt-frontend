import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Agent {
  _id: string;
  fullName: string;
  role: string;
  email?: string;
  phone?: string;
  photo?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AgentService {
private apiUrl = `${environment.apiUrl}/agents`;

  constructor(private http: HttpClient) {}

  getAgents(): Observable<Agent[]> {
    return this.http.get<Agent[]>(this.apiUrl);
  }
}
