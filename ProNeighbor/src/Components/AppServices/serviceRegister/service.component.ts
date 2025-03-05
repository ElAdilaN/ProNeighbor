import { Component } from '@angular/core';
import {
  Categories,
  Service,
} from '../../../Model/servicesProvider/service.model';
import { ServicesService } from '../../../services/AppServices/services.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-service',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './service.component.html',
  styleUrl: './service.component.css',
})
export class ServiceComponent {
  constructor(
    private ServicesService: ServicesService,
    private router: Router,
    private authService: AuthService,
  ) {}

  public categories?: Categories;
  serviceData: Service = new Service('', '', 0, '', '', new Date(), '');
  id?: string | null;

  ngOnInit(): void {
    this.id = this.authService.getUserIdFromToken();
    this.ServicesService.getAllCategories().subscribe((data: any) => {
      this.categories = new Categories(data);
    });
  }

  submitForm() {
    if (this.id) {
      this.serviceData.id = this.id;
    }

    this.ServicesService.createService(this.serviceData).subscribe(
      () => {
        Swal.fire({
          title: 'Success!',
          text: 'Service Created Successfully!',
          icon: 'success',
          confirmButtonText: 'OK',
        });
      },
      () => {
        Swal.fire({
          title: 'Error!',
          text: 'Error creating service. Please try again.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      },
    );
  }
}
