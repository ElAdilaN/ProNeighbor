import { Component } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterLink,
  RouterOutlet,
} from '@angular/router';

import { filter } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

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

    this.userRole = this.authService.getUserType();
    this.userId = this.authService.getUserIdFromToken();

    // Subscribe to router events to update page title when route changes
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.setPageTitle();
      });

    // Set initial title when the component is loaded
    this.setPageTitle();
  }

  handleAuthTokenChange() {
    console.log('Auth token has changed. Logging out...');
    this.logout();
  }

  userRole: string | null = null;
  userId?: string | null;
  pageTitle: string = '';

  private setPageTitle(): void {
    // Get the current route's path or data
    const currentRoute = this.route.firstChild?.snapshot.routeConfig?.path;

    // Set the title based on the current route path
    switch (currentRoute) {
      case 'UserProfile':
        this.pageTitle = 'Profile';
        break;
      case 'chat':
        this.pageTitle = 'Chat Dashboard';
        break;
      case 'ServiceList/All':
        this.pageTitle = 'All Services';
        break;
      case 'userArea':
        this.pageTitle = 'User Dashboard';
        break;
      case 'ReviewForm':
        this.pageTitle = 'Add Review';
        break;
      case 'providerArea':
        this.pageTitle = 'Provider Dashboard';
        break;
      case 'CreateService':
        this.pageTitle = 'Add Service';
        break;
      case 'faq':
        this.pageTitle = 'Q&A';
        break;
      default:
        this.pageTitle = 'Dashboard';
    }
  }

  logout() {
    this.authService.logout();
  }
}
