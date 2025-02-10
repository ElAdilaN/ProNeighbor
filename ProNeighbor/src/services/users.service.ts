import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token'); // Adjust based on where you store the token
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  getUserProfile(): Observable<any> {
    return this.http.get<any>(`${environment.api_url_GetProfileInfo}`, {
      headers: this.getHeaders(),
    });
  }
  updateUserProfile(profileData: any): Observable<any> {
    return this.http.put<any>(
      `${environment.api_url_PutProfileInfo}/user/profile`,
      profileData,
      {
        headers: this.getHeaders(),
      }
    );
  }
}
