import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { catchError, of, tap } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(private authService: AuthService, private router: Router) {}

  loginData = {
    email: '',
    password: '',
  };
  message: string = '';

  validateInput() {
    // This method is for general input validation and triggers on input change
    // Here we are manually validating the fields on every input change
  }

  onLogin() {
    localStorage.setItem('blaba', 'teeeeee');

    const { email, password } = this.loginData;

    this.authService
      .login(email, password)
      .pipe(
        tap((response) => {
          this.authService.saveToken(response.token, response.user_type);
          this.router.navigate(['/home']);
          this.message = 'Successfully logged in!';
          console.log('Token:', response.token); // Debugging
        }),
        catchError((error) => {
          // Handle errors
          this.message =
            error.error?.message || 'An error occurred while logging in.';
          console.error('Login error:', error);
          return of(null); // Return a safe fallback value
        })
      )
      .subscribe();
  }
}
