import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ROLS } from '../../../enums/enum';

import Swal from 'sweetalert2';
import { AuthService } from '../../../services/auth/auth.service';

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

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  validateForm(): void {
    const { name, email, password, confirmPassword, acceptedTerms } = this.user;
    this.isFormValid =
      !!name &&
      !!email &&
      !!password &&
      password.length >= 8 && // Enforce password length requirement
      !!confirmPassword &&
      password === confirmPassword &&
      acceptedTerms;
  }

  onSubmit(): void {
    this.formSubmitted = true;

    if (this.isFormValid && !this.isSubmitting) {
      this.isSubmitting = true;
      this.errorMessage = null;

      this.authService
        .register(
          this.user.name,
          this.user.email,
          this.user.password,
          ROLS.USER,
        )
        .subscribe({
          next: (response) => {
            console.log('Registration successful:', response);

            Swal.fire({
              title: 'Success!',
              text: 'Registration successful. Logging in...',
              icon: 'success',
              timer: 2000,
              showConfirmButton: false,
            });

            this.authService
              .login(this.user.email, this.user.password)
              .subscribe({
                next: (loginResponse) => {
                  if (!loginResponse || !loginResponse.token) {
                    console.error('No token received after registration.');
                    Swal.fire({
                      title: 'Registration Successful',
                      text: 'Please log in manually. No token received.',
                      icon: 'info',
                      confirmButtonText: 'OK',
                    });
                    this.isSubmitting = false;
                    return; // Stop execution here
                  }

                  console.log(loginResponse.token);

                  this.authService.saveToken(loginResponse.token);

                  const userRole = this.authService.getUserType();
                  if (userRole) {
                    this.authService.redirectToRoleBasedPage(userRole);
                  } else {
                    this.router.navigate(['/dashboard']);
                  }

                  this.isSubmitting = false;
                },
                error: (loginError) => {
                  console.error('Login failed after registration:', loginError);
                  Swal.fire({
                    title: 'Error!',
                    text: 'An error occurred during login. Please try logging in manually.',
                    icon: 'error',
                    confirmButtonText: 'OK',
                  });
                  this.isSubmitting = false;
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

            Swal.fire({
              title: 'Registration Failed',
              text: this.errorMessage,
              icon: 'error',
              confirmButtonText: 'OK',
            });

            this.isSubmitting = false;
          },
        });
    } else if (!this.isFormValid) {
      Swal.fire({
        title: 'Form Error',
        text: 'Please fill all fields correctly and accept the terms.',
        icon: 'warning',
        confirmButtonText: 'OK',
      });
    }
  }
}
