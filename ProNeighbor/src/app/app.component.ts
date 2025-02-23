import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  constructor(private authService: AuthService, private router: Router) {}

  isAuthRoute: boolean = false;

  ngOnInit() {
    this.authService.authTokenChanged.subscribe(() => {
      this.handleAuthTokenChange();
    });
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        const authRoutes = ['/login', '/register'];
        this.isAuthRoute = authRoutes.includes(event.url);
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
