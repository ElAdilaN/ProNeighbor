import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Categories } from '../Model/servicesProvider/service.model';
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
}
