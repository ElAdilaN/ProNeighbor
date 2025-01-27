import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { ROLS } from '../enums/enum';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
interface TokenPayload {
  id: string;
  role: string;
  iat: number;
  exp: number;
}
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post(environment.api_url_login, { email, password });
  }

  saveToken(token: string): void {
    localStorage.setItem('authToken', token);
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }
  getUserType = (token: string | null): ROLS | null => {
    try {
      if (token) {
        const decoded = jwtDecode<TokenPayload>(token);

        // Check if token is expired
        if (decoded.exp && Date.now() >= decoded.exp * 1000) {
          console.log('Token has expired');
          return null;
        }

        if (decoded && typeof decoded.role === 'string') {
          if (decoded.role === '38BDC97C-44EA-45D4-84AB-FA6BA9A5D435') {
            return ROLS.USER;
          } else if (decoded.role === '6845C548-22DB-46B4-AFA8-D5536261791B') {
            return ROLS.PROVIDER;
          }
        }
      }
      return null;
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  };

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
