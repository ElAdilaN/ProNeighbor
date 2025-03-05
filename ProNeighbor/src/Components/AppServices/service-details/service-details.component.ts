import { Component } from '@angular/core';
import { Service } from '../../../Model/servicesProvider/service.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicesService } from '../../../services/AppServices/services.service';
import { ReviewListComponent } from '../../Reviews/review-list/review-list.component';

@Component({
  selector: 'app-service-details',
  standalone: true,
  imports: [ReviewListComponent],
  templateUrl: './service-details.component.html',
  styleUrl: './service-details.component.css',
})
export class ServiceDetailsComponent {
  isLoading = true;
  errorMessage = '';
  serviceId: string | null = null;
  service: Service | null = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private servicesService: ServicesService,
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.serviceId = params.get('id');
      if (this.serviceId) {
        this.loadServiceDetails(this.serviceId);
      }
    });
  }

  loadServiceDetails(id: string): void {
    this.servicesService.getServiceById(id).subscribe({
      next: (data: any) => {
        this.service = data.service;
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'Failed to load service details.';
        this.isLoading = false;
      },
    });
  }
}
