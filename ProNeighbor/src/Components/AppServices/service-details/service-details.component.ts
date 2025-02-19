import { Component } from '@angular/core';
import { Service } from '../../../Model/servicesProvider/service.model';
import { ActivatedRoute } from '@angular/router';
import { ServicesService } from '../../../services/services.service';

@Component({
  selector: 'app-service-details',
  standalone: true,
  imports: [],
  templateUrl: './service-details.component.html',
  styleUrl: './service-details.component.css',
})
export class ServiceDetailsComponent {
  serviceId: string | null = null;
  service: Service | null = null;

  constructor(
    private route: ActivatedRoute,
    private servicesService: ServicesService
  ) {}

  ngOnInit(): void {
    // Extract the ID from the route
    this.route.paramMap.subscribe((params) => {
      this.serviceId = params.get('id');
      if (this.serviceId) {
        // this.loadServiceDetails(this.serviceId);
      }
    });
  }

  /*   loadServiceDetails(id: string) {
    this.servicesService.getServiceById(id).subscribe({
      next: (data) => (this.service = data),
      error: (err) => console.error('Error loading service:', err),
    });
  } */
}
