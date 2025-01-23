import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginData = {
    email: '',
    password: '',
  };

  validateInput() {
    // This method is for general input validation and triggers on input change
    // Here we are manually validating the fields on every input change
  }

  onLogin() {
    // Perform login logic
    if (this.loginData.email && this.loginData.password) {
      console.log('Logging in with:', this.loginData);
    }
  }
}
