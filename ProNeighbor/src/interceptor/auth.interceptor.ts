import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpEventType } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Bypass interceptor for login & register requests
  if (req.url.includes('/login') || req.url.includes('/register')) {
    return next(req);
  }

  const token = authService.getToken();

  let clonedRequest = req;
  if (token) {
    clonedRequest = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` },
    });

    try {
      const decodedToken: any = jwtDecode(token);
      const currentTime = Math.floor(Date.now() / 1000);

      // Check if token is expired
      if (decodedToken.exp && decodedToken.exp < currentTime) {
        console.warn('Token expired. Redirecting to login.');
        authService.clearToken();
        router.navigate(['/login']);
        return throwError(() => new Error('Token expired.'));
      }
    } catch (error) {
      console.error('Invalid token:', error);
      authService.clearToken();
      router.navigate(['/login']);
      return throwError(() => new Error('Invalid token.'));
    }
  }

  console.log('before return ');
  return next(clonedRequest).pipe(
    tap((event) => {
      if (event.type === HttpEventType.Response) {
        let newToken = event.headers
          .get('Authorization')
          ?.replace('Bearer ', '');
        console.log('heere : ', newToken);
        // Also check if the token is in the response body
        const body = event.body as any;
        console.log('body bla bla  ', body);
        if (!newToken && body?.newToken) {
          newToken = body.newToken;
          console.log('tokn nw', newToken);
        }

        if (newToken) {
          authService.saveToken(newToken);
          console.log('Token renewed and saved:', newToken);
        }
      }
    }),
    catchError((error) => {
      if (error.status === 401) {
        console.warn('Unauthorized request. Redirecting to login.');
        authService.clearToken();
        router.navigate(['/login']);
      }
      return throwError(() => error);
    }),
  );
};
