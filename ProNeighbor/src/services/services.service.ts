import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Categories, Service } from '../Model/servicesProvider/service.model';
import { environment } from '../environments/environment';
import { UsersService } from './users.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ServicesService {
  constructor(private http: HttpClient, private userService: UsersService) {}
  getAllCategories(): Observable<Categories> {
    return this.http.get<any>(environment.api_url_GetAllCategories, {
      headers: this.userService.getHeaders(),
    });
  }

  createService(service: Service) {
    return this.http.post<any>(environment.api_url_CreateService, service);
  }

  getAllServices(): Observable<Service[]> {
    return this.http.get<any>(environment.api_url_CreateService);
  }

  getAllServicesByProvider(id: string): Observable<Service[]> {
    return this.http.get<any>(
      `${environment.api_url_GetAllServicesByProvider}${id}`
    );
  }
}
