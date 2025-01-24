import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { ROLS } from '../enums/enum';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post(environment.api_url_login, { email, password });
  }

  saveToken(token: string, role: ROLS): void {
    localStorage.setItem('authToken', token);
    localStorage.setItem('user_type', role.toString());
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }
  getUserType(): ROLS | null {
    const role = localStorage.getItem('user_type');

    return role ? (role as ROLS) : null;
  }

  clearToken(): void {
    localStorage.removeItem('authToken');

    localStorage.removeItem('user_type');
  }

  redirectToRoleBasedPage(role: ROLS): void {
    switch (role) {
      case ROLS.USER:
        this.router.navigate(['/userArea']);
        break;
      case ROLS.PROVIDER:
        this.router.navigate(['/providerArea']);
        break;
      default:
        this.router.navigate(['/login']);
        break;
    }
  }
}
