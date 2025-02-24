import { Component, Input } from '@angular/core';
import { ReviewDTO } from '../../../Model/appServices/review.model';
import { ReviewsService } from '../../../services/reviews.service';
import { ReviewCardComponent } from '../review-card/review-card.component';
import { ActivatedRoute } from '@angular/router';
import { ReviewFormComponent } from '../review-form/review-form.component';

@Component({
  selector: 'app-review-list',
  standalone: true,
  imports: [ReviewCardComponent, ReviewFormComponent],
  templateUrl: './review-list.component.html',
  styleUrl: './review-list.component.css',
})
export class ReviewListComponent {
  @Input() serviceId?: string | null;
  reviews: ReviewDTO[] = [];
  isLoading = true;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private reviewsService: ReviewsService
  ) {}

  ngOnInit(): void {
    this.serviceId = this.route.snapshot.paramMap.get('id');
    if (this.serviceId) {
      this.loadReviews(this.serviceId);
    }
  }

  loadReviews(serviceId: string): void {
    this.reviewsService.getAllReviewsForService(serviceId).subscribe({
      next: (data) => {
        console.log('data', data);
        this.reviews = data;
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'Failed to load reviews';
        this.isLoading = false;
      },
    });
  }
}
