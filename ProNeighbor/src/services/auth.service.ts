import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post(environment.api_url_login, { email, password });
  }

  saveToken(token: string, user_type: string): void {
    localStorage.setItem('authToken', token);
    localStorage.setItem('user_type', user_type);
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }
  getUserType(): string | null {
    return localStorage.getItem('user_type');
  }

  clearToken(): void {
    localStorage.removeItem('authToken');

    localStorage.removeItem('user_type');
  }
}
