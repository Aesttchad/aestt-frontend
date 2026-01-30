import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StudentInfo } from '../../../services/student-info.service';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminStudentInfoService {
  private apiUrl = `${environment.apiUrl}/student-info`;


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

  getAll(): Observable<StudentInfo[]> {
    return this.http.get<StudentInfo[]>(this.apiUrl, this.authHeaders());
  }

  create(info: Partial<StudentInfo>): Observable<StudentInfo> {
    return this.http.post<StudentInfo>(this.apiUrl, info, this.authHeaders());
  }

  update(id: string, info: Partial<StudentInfo>): Observable<StudentInfo> {
    return this.http.put<StudentInfo>(
      `${this.apiUrl}/${id}`,
      info,
      this.authHeaders()
    );
  }

  delete(id: string): Observable<any> {
    return this.http.delete(
      `${this.apiUrl}/${id}`,
      this.authHeaders()
    );
  }
}
