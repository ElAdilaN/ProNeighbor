import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService); // Inject AuthService to access token and user_type
  const router = inject(Router); // Inject Router to navigate when necessary

  // Check if the token is available
  const token = authService.getToken();
  const userType = authService.getUserType();

  // If no token or no user type, redirect to login
  if (!token || !userType) {
    authService.clearToken(); // Clear any stored data
    router.navigate(['/login']); // Redirect to login page
    return false;
  }

  return true;
};
