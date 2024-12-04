import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  private apiUrl = 'https://api-backend-angular.aleator.wiki/appointments';

  constructor(private http: HttpClient) {}

  getAppointments(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl, {
      headers: this.getHeaders(),
    });
  }

  createAppointment(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, data, { headers: this.getHeaders() });
  }

  completeAppointment(id: string): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/done/${id}`, {}, { headers: this.getHeaders() });
  }

  cancelAppointment(id: string): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/cancel/${id}`, {}, { headers: this.getHeaders() });
  }

  editAppointment(id: string, data: any): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, data, { headers: this.getHeaders() });
  }

  deleteAppointment(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }

  private getHeaders() {
    const token = localStorage.getItem('token');
    return { Authorization: `Bearer ${token}` };
  }
}
