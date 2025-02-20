import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  catchError,
  forkJoin,
  map,
  Observable,
  of,
  switchMap,
  tap,
} from 'rxjs';
import { environment } from '../environments/environment';
import { UsersService } from './users.service';
import { Review, ReviewDTO } from '../Model/appServices/review.model';

@Injectable({
  providedIn: 'root',
})
export class ReviewsService {
  constructor(private http: HttpClient, private userService: UsersService) {}

  getAllReviewsForService(id: string): Observable<any> {
    return this.http.get<any>(
      `${environment.api_url_GetAllReviewsForService}${id}`,
      {
        headers: this.userService.getHeaders(),
      }
    );
  }

  getAllReviewsForUser(): Observable<any> {
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
    return this.http.delete<void>(`${environment.api_url_DeleteReview}${id}`, {
      headers: this.userService.getHeaders(),
    });
  }
  AddReview(review: Review): Observable<any> {
    console.log(review);
    return this.http.post<Review>(
      `${environment.api_url_AddReview}`,
      {
        service_id: review.service_id,
        rating: review.rating.toString(),
        comment: review.comment,
      },
      {
        headers: this.userService.getHeaders(),
      }
    );
  }
}
