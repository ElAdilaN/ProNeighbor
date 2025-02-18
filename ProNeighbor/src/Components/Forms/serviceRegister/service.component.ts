import { Component } from '@angular/core';
import {
  Categories,
  Category,
  Service,
} from '../../../Model/servicesProvider/service.model';
import { ServicesService } from '../../../services/services.service';
import { UsersService } from '../../../services/users.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-service',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './service.component.html',
  styleUrl: './service.component.css',
})
export class ServiceComponent {
  constructor(private ServicesService: ServicesService) {}
  public categories?: Categories;
  serviceData: Service = new Service(
    'BFB2FDF9-07FF-4360-BE9E-222C2EAA4AED',
    '',
    0,
    '',
    '',
    new Date(),
    ''
  );

  ngOnInit(): void {
    this.ServicesService.getAllCategories().subscribe((data: any) => {
      this.categories = new Categories(data);
    });
  }
  submitForm() {
    //this.serviceData.setId(this.provider_id) = this.provider_id;
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
