import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-registration',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './user-registration.component.html',
  styleUrl: './user-registration.component.css',
})
export class UserRegistrationComponent {
  user = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptedTerms: false,
  };

  isFormValid = false;
  formSubmitted = false;

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

    if (this.isFormValid) {
      console.log('Form submitted successfully:', this.user);
    } else {
      console.error('Form submission failed. Please fix the errors.');
    }
  }
}
