import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.authTokenChanged.subscribe(() => {
      this.handleAuthTokenChange();
    });
  }

  handleAuthTokenChange() {
    console.log('Auth token has changed. Logging out...');
    this.logout();
  }

  logout() {
    this.authService.logout();
  }
}
