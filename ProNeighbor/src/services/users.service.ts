import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { User, Provider } from '../Model/user/user.model';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}
  getHeaders(): HttpHeaders {
    // const token = localStorage.getItem('token'); // Adjust based on where you store the token
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjE3MzAxREY3LUU0QTYtNEVGMS1BMEMwLTIzQzdEM0RGQkQwOCIsImlhdCI6MTczOTM4NjU3NCwiZXhwIjoxNzM5MzkwMTc0fQ.8Kg2fdtQQ3Q_bqNmwVns10dLZkuZS1-VvjKUdfC6H_w';
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  getUserProfile(): Observable<User | Provider> {
    return this.http.get<any>(`${environment.api_url_GetProfileInfo}`, {
      headers: this.getHeaders(),
    });
  }
  updateUserProfile(profileData: User | undefined): Observable<any> {
    console.log('service : ', profileData);
    return this.http.put<any>(environment.api_url_PutProfileInfo, profileData, {
      headers: this.getHeaders(),
    });
  }
}
