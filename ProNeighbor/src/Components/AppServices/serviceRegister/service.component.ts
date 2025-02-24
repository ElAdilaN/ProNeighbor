import { Component } from '@angular/core';
import {
  Categories,
  Category,
  Service,
} from '../../../Model/servicesProvider/service.model';
import { ServicesService } from '../../../services/services.service';
import { UsersService } from '../../../services/users.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

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
    private authService: AuthService
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
      (response) => {
        alert('Service Created Successfully!');
      },
      (error) => {
        alert('Error creating service');
      }
    );
  }
}
