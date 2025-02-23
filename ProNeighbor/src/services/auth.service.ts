import { HttpClient } from '@angular/common/http';
import { Injectable, signal, effect, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { ROLS } from '../Model/user/enum';
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
  public authTokenChanged: EventEmitter<void> = new EventEmitter<void>(); // Event emitter for token change

  constructor(private http: HttpClient, private router: Router) {
    // Listen for changes in localStorage from other tabs/windows
    window.addEventListener('storage', (event) => {
      if (event.key === 'authToken') {
        this.authTokenChanged.emit(); // Emit the event when the authToken changes in another tab
      }
    });
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post(environment.api_url_login, { email, password });
  }

  register(
    name: string,
    email: string,
    password: string,
    user_type: string
  ): Observable<any> {
    return this.http.post(environment.api_url_register, {
      name,
      email,
      password,
      user_type,
    });
  }

  saveToken(token: string): void {
    this.clearToken();
    localStorage.setItem('AuthToken', token);
  }

  getToken(): string | null {
    return localStorage.getItem('AuthToken');
    //return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijk1MkI5NEI1LTkyQUMtNDU5NC1CNUM1LUNEMzJCMDY5RTcyNSIsImlhdCI6MTczOTk4Mzg0NSwiZXhwIjoxNzM5OTg3NDQ1fQ.LC0YYA13_z8d7kiy4RSNZb5VjBYNZs7GGfBcH0RGvPk';
  }
  getUserType = (): ROLS | null => {
    try {
      let token = this.getToken();

      if (token) {
        const decoded = jwtDecode<TokenPayload>(token);

        // Check if token is expired
        if (decoded.exp && Date.now() >= decoded.exp * 1000) {
          console.log('Token has expired');
          return null;
        }

        if (decoded && typeof decoded.role === 'string') {
          if (decoded.role === 'customer') {
            return ROLS.USER;
          } else if (decoded.role === 'provider') {
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

  getUserIdFromToken = (): string | null => {
    try {
      let token = this.getToken();
      if (token) {
        const decoded = jwtDecode<TokenPayload>(token);

        // Check if token is expired
        if (decoded.exp && Date.now() >= decoded.exp * 1000) {
          console.log('Token has expired');
          return null;
        }

        // Return the user ID
        return decoded.id || null;
      }
      return null;
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  };

  clearToken(): void {
    localStorage.removeItem('AuthToken');

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

  logout() {
    this.clearToken();
    this.router.navigate(['/login']);
  }
}
