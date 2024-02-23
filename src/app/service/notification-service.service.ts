import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private apiUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) {}

  subscribeTokenToServer(token: string): Observable<any> {
    const formData = new FormData();
    formData.append('token', token);
    return this.http.post(`${this.apiUrl}/subscribe-all`, formData);
  }
  sendMessageToServer(token: string): Observable<any> {
    const formData = new FormData();
    formData.append('token', token);
    return this.http.post(`${this.apiUrl}/send-message`, formData);
  }
}
