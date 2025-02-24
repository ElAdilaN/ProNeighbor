import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ROLS } from '../../../Model/user/enum';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-user-registration',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css'],
})
export class UserRegistrationComponent {
  user = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptedTerms: false,
  };
  errorMessage: string | null = null;
  isFormValid = false;
  formSubmitted = false;
  isSubmitting = false;

  constructor(private authService: AuthService, private router: Router) {}

  validateForm(): void {
    const { name, email, password, confirmPassword, acceptedTerms } = this.user;
    this.isFormValid =
      !!name &&
      !!email &&
      !!password &&
      !!confirmPassword &&
      password === confirmPassword &&
      acceptedTerms;
  }

  onSubmit(): void {
    this.formSubmitted = true;

    if (this.isFormValid && !this.isSubmitting) {
      this.isSubmitting = true; // Disable the button
      this.errorMessage = null; // Clear previous errors

      // First, register the user
      this.authService
        .register(
          this.user.name,
          this.user.email,
          this.user.password,
          ROLS.USER
        )
        .subscribe({
          next: (response) => {
            console.log('Registration successful:', response);

            // Automatically log in the user
            this.authService
              .login(this.user.email, this.user.password)
              .subscribe({
                next: (loginResponse) => {
                  console.log('Login successful:', loginResponse);
                  // Save the token
                  this.authService.saveToken(loginResponse.token);

                  // Redirect based on role or to home page
                  const userRole = this.authService.getUserType();
                  if (userRole) {
                    this.authService.redirectToRoleBasedPage(userRole);
                  } else {
                    this.router.navigate(['/home']); // Fallback to home
                  }

                  this.isSubmitting = false; // Re-enable the button
                },
                error: (loginError) => {
                  console.error('Login failed after registration:', loginError);
                  this.errorMessage =
                    'An unexpected error occurred during login. Please try logging in manually.';
                  this.isSubmitting = false; // Re-enable the button
                },
              });
          },
          error: (error) => {
            console.error('Registration failed:', error);
            if (
              error.status === 400 &&
              error.error.message === 'User already exists'
            ) {
              this.errorMessage =
                'User already exists. Please use a different email.';
            } else {
              this.errorMessage =
                'An unexpected error occurred. Please try again later.';
            }
            alert(this.errorMessage);
            this.isSubmitting = false; // Re-enable the button
          },
        });
    } else if (!this.isFormValid) {
      console.error('Form submission failed. Please fix the errors.');
    }
  }
}
