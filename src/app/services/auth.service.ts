import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://api-backend-angular.aleator.wiki/auth';
  private userRole = new BehaviorSubject<string | null>(null);

  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string) {
    return this.http.post(`${this.apiUrl}/login`, { email, password });
  }

  register(name: string, email: string, password: string, role: string) {
    return this.http.post(`${this.apiUrl}/register`, { name, email, password, role });
  }

  setUserData(token: string, role: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('role', role);
    this.userRole.next(role);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getRole() {
    return this.userRole.asObservable();
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    this.userRole.next(null);
    this.router.navigate(['/login']);
  }

  loadUserRole() {
    const role = localStorage.getItem('role');
    if (role) {
      this.userRole.next(role);
    }
  }
}
