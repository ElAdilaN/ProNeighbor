import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { User } from '../Model/user/user.model';
import { Provider } from '../Model/user/provider.model';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}
  getHeaders(): HttpHeaders {
    const token = localStorage.getItem('AuthToken'); // Adjust based on where you store the token
    //const token =
    //'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijk1MkI5NEI1LTkyQUMtNDU5NC1CNUM1LUNEMzJCMDY5RTcyNSIsImlhdCI6MTczOTk4NTU2NywiZXhwIjoxNzM5OTg5MTY3fQ.8JD9fAECo1mZBLoO6UBxwaZsvLOypqUei7j6T959JCE';
    //'http://localhost:4200/ReviewsList/1B0C31C6-5500-4CBB-81AE-FF11CE0AEAE8';
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  getUserById(id: string): Observable<User> {
    return this.http.get<any>(
      `${environment.api_url_GetProfileInfoById}${id}`,
      {
        headers: this.getHeaders(),
      },
    );
  }

  getUserProfile(): Observable<User | Provider> {
    return this.http.get<any>(`${environment.api_url_GetProfileInfo}`, {
      headers: this.getHeaders(),
    });
  }
  updateUserProfile(profileData: User | undefined): Observable<any> {
    return this.http.put<any>(environment.api_url_PutProfileInfo, profileData, {
      headers: this.getHeaders(),
    });
  }

  getAllUsers(chatId: string): Observable<User[]> {
    return this.http.get<any>(`${environment.api_url_GetAllUsers}/${chatId}`, {
      headers: this.getHeaders(),
    });
  }
}
