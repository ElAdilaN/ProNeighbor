import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ReviewDTO } from '../../../Model/appServices/review.model';

import { ReviewsService } from '../../../services/reviews/reviews.service';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-review-card',
  standalone: true,
  imports: [],
  templateUrl: './review-card.component.html',
  styleUrl: './review-card.component.css',
})
export class ReviewCardComponent {
  @Input() review!: ReviewDTO;
  @Output() reviewDeleted = new EventEmitter<void>();

  loggedInUserId!: string | null;

  constructor(
    private authService: AuthService,
    private reviewService: ReviewsService,
  ) {}

  ngOnInit() {
    this.loggedInUserId = this.authService.getUserIdFromToken(); // Get user ID from token
  }

  editReview(review: ReviewDTO) {
    console.log('Edit review:', review);
  }

  deleteReview(reviewId: string) {
    if (confirm('Are you sure you want to delete this review?')) {
      this.reviewService.deleteReview(reviewId).subscribe({
        next: () => {
          console.log('Review deleted successfully');
          this.reviewDeleted.emit(); // Emit the event after successful deletion
        },
        error: (err) => console.error('Error deleting review:', err),
      });
    }
  }
}
