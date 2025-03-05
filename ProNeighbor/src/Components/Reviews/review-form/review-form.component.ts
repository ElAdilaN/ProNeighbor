import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Review } from '../../../Model/appServices/review.model';
import { FormsModule } from '@angular/forms';
import { ReviewsService } from '../../../services/reviews/reviews.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-review-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './review-form.component.html',
  styleUrl: './review-form.component.css',
})
export class ReviewFormComponent {
  @Input() serviceId!: string;
  @Output() reviewAdded = new EventEmitter<void>();
  _serviceId!: string;
  review: Review = new Review(); // Now the class is correctly instantiated
  ngOnInit(): void {
    console.log('here', this.serviceId);
    this._serviceId = this.serviceId;
  }
  constructor(
    private route: ActivatedRoute,
    private reviewService: ReviewsService,
  ) {}

  onSubmit() {
    if (
      this.review.rating < 1 ||
      this.review.rating > 5 ||
      this.review.comment.trim().length < 5
    ) {
      return;
    }

    this.review.service_id = this._serviceId;
    console.log(this.review.service_id);
    this.reviewService.AddReview(this.review).subscribe(() => {
      this.review = new Review(); // Reset form
      this.reviewAdded.emit();
    });
  }
}
