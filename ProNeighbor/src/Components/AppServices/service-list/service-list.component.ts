import { Component, OnInit } from '@angular/core';
import { Service } from '../../../Model/servicesProvider/service.model';
import { ServicesService } from '../../../services/services.service';
import { ServiceCardComponent } from '../service-card/service-card.component';

@Component({
  selector: 'app-service-list',
  standalone: true,
  imports: [ServiceCardComponent],
  templateUrl: './service-list.component.html',
  styleUrl: './service-list.component.css',
})
export class ServiceListComponent implements OnInit {
  services: Service[] = [];
  isLoading = true;
  errorMessage = '';

  constructor(private serviceService: ServicesService) {}

  ngOnInit(): void {
    this.serviceService.getAllServices().subscribe({
      next: (response: any) => {
        this.services = response.services;
        console.log(this.services);
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Failed to load services';
        this.isLoading = false;
      },
    });
  }
}
