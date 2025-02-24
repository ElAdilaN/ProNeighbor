import { Component, OnInit, OnDestroy } from '@angular/core';
import { Service } from '../../../Model/servicesProvider/service.model';
import { ServicesService } from '../../../services/services.service';
import { ServiceCardComponent } from '../service-card/service-card.component';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { filter, Subscription } from 'rxjs';

@Component({
  selector: 'app-service-list',
  standalone: true,
  imports: [ServiceCardComponent],
  templateUrl: './service-list.component.html',
  styleUrl: './service-list.component.css',
})
export class ServiceListComponent implements OnInit, OnDestroy {
  serviceId: string | null = null;
  services: Service[] = [];
  isLoading = true;
  errorMessage = '';
  private routeSubscription!: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private serviceService: ServicesService
  ) {}

  ngOnInit(): void {
    this.loadData();

    // Listen for route changes and reload data
    this.routeSubscription = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => this.loadData());
  }

  loadData(): void {
    this.isLoading = true; // Reset loading state
    this.serviceId = this.route.snapshot.paramMap.get('id');

    if (this.serviceId === 'All') {
      this.serviceService.getAllServices().subscribe({
        next: (response: any) => {
          console.log('All services:', response.services);
          this.services = response.services;
          this.isLoading = false;
        },
        error: () => {
          this.errorMessage = 'Failed to load services';
          this.isLoading = false;
        },
      });
    } else if (this.serviceId) {
      this.serviceService.getAllServicesByProvider(this.serviceId).subscribe({
        next: (response: any) => {
          console.log(
            `Services for provider ${this.serviceId}:`,
            response.services
          );
          this.services = response.services;
          this.isLoading = false;
        },
        error: () => {
          this.errorMessage = 'Failed to load services';
          this.isLoading = false;
        },
      });
    }
  }

  ngOnDestroy(): void {
    this.routeSubscription?.unsubscribe();
  }
}
