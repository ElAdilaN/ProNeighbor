import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(private authService: AuthService) {}

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
    const { email, password } = this.loginData;

    this.authService.login(email, password).subscribe(
      (response) => {
        this.authService.saveToken(response.token);

        this.message = 'Successfully logged in!';
        console.log('Token:', response.token); // Debugging
      },
      (error) => {
        // Handle errors
        this.message =
          error.error.message || 'An error occurred while logging in.';
        console.error('Login error:', error);
      }
    );
  }
}
