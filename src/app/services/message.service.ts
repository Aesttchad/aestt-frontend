import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Message {
  _id?: string;
  fullName: string;
  email: string;
  subject?: string;
  message: string;
  createdAt?: string;
}

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private apiUrl = `${environment.apiUrl}/messages`;


  constructor(private http: HttpClient) {}

  // Envoyer un message depuis le formulaire public
  sendMessage(msg: Message): Observable<any> {
    return this.http.post<any>(this.apiUrl, msg);
  }
}
