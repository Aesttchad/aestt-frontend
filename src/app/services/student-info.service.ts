import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface StudentInfo {
  _id?: string;
  title: string;
  content: string;
  category: 'Procédure' | 'Université' | 'Bourse' | 'Conseil pratique';
  attachments?: string[];
  createdAt?: string;
  updatedAt?: string;
}

@Injectable({
  providedIn: 'root'
})
export class StudentInfoService {
private apiUrl = `${environment.apiUrl}/student-info`;

  constructor(private http: HttpClient) {}

  getAllInfos(): Observable<StudentInfo[]> {
    return this.http.get<StudentInfo[]>(this.apiUrl);
  }

  getInfosByCategory(category: string): Observable<StudentInfo[]> {
    return this.http.get<StudentInfo[]>(`${this.apiUrl}/category/${category}`);
  }

  createInfo(info: StudentInfo): Observable<StudentInfo> {
    return this.http.post<StudentInfo>(this.apiUrl, info);
  }

  updateInfo(id: string, info: StudentInfo): Observable<StudentInfo> {
    return this.http.put<StudentInfo>(`${this.apiUrl}/${id}`, info);
  }

  deleteInfo(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
