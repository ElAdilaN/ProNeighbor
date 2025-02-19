import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { UsersService } from './users.service';
import { Review } from '../Model/appServices/review.model';

@Injectable({
  providedIn: 'root',
})
export class ReviewsService {
  constructor(private http: HttpClient, private userService: UsersService) {}
  getAllReviewsForService(id: string) {
    return this.http.get<any>(
      `${environment.api_url_GetAllReviewsForService}${id}`,
      {
        headers: this.userService.getHeaders(),
      }
    );
  }
  getAllReviewsForUser() {
    return this.http.get<any>(
      `${environment.api_url_GetAllReviewsForService}`,
      {
        headers: this.userService.getHeaders(),
      }
    );
  }
  updateReview(id: string, review: Partial<Review>): Observable<Review> {
    return this.http.put<Review>(
      `${environment.api_url_UpdateReview}/${id}`,
      review,
      {
        headers: this.userService.getHeaders(),
      }
    );
  }

  deleteReview(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.api_url_DeleteReview}/${id}`, {
      headers: this.userService.getHeaders(),
    });
  }
}
