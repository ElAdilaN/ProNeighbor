import { Component, OnInit } from '@angular/core';
import {
  RouterLink,
  RouterOutlet,
  ActivatedRoute,
  Router,
  NavigationEnd,
} from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { filter } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  userRole: string | null = null;
  userId?: string | null;
  pageTitle: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
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
