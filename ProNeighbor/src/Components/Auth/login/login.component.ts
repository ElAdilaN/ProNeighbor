import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, of, tap } from 'rxjs';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  loginData = {
    email: '',
    password: '',
  };
  message: string = '';
  loading: boolean = false;

  validateInput() {
    // This method is for general input validation and triggers on input change
    // Here we are manually validating the fields on every input change
  }

  onLogin() {
    if (this.loading) return; // Prevent multiple clicks

    this.loading = true; // Start loading

    const { email, password } = this.loginData;

    this.authService
      .login(email, password)
      .pipe(
        tap((response) => {
          this.authService.saveToken(response.token);
          this.router.navigate(['/dashboard']);
          this.message = 'Successfully logged in!';
          console.log('Token:', response.token); // Debugging
          console.log('id', this.authService.getUserIdFromToken());
        }),
        catchError((error) => {
          this.message =
            error.error?.message || 'An error occurred while logging in.';
          console.error('Login error:', error);
          return of(null); // Return a safe fallback value
        }),
      )
      .subscribe({
        complete: () => (this.loading = false), // Stop loading after response
      });
  }
}
