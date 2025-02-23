import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReviewCardComponent } from './review-card.component';
import { AuthService } from '../../../services/auth.service';
import { ReviewsService } from '../../../services/reviews.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { ReviewDTO } from '../../../Model/appServices/review.model';

describe('ReviewCardComponent', () => {
  let component: ReviewCardComponent;
  let fixture: ComponentFixture<ReviewCardComponent>;
  let authService: AuthService;
  let reviewsService: ReviewsService;

  // Creating the review object using the constructor of ReviewDTO
  const mockReview = new ReviewDTO(
    '1', // _id
    '123', // _service_id
    5, // _rating
    'Great service!', // _comment
    new Date(), // _created_at
    'user1', // _user_id
    'John Doe' // _user_name
  );

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // Import HttpClientTestingModule for HttpClient dependency
      providers: [AuthService, ReviewsService],
    }).compileComponents();

    fixture = TestBed.createComponent(ReviewCardComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    reviewsService = TestBed.inject(ReviewsService);

    // Set the default return value for getUserIdFromToken
    spyOn(authService, 'getUserIdFromToken').and.returnValue('user1'); // Simulating logged-in user
    component.review = mockReview; // Set the mock review
    fixture.detectChanges(); // Trigger change detection
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the review information correctly', () => {
    const reviewNameElement = fixture.debugElement.query(
      By.css('h3')
    ).nativeElement;
    const reviewDateElement = fixture.debugElement.query(
      By.css('.review-date')
    ).nativeElement;
    const reviewCommentElement = fixture.debugElement.query(
      By.css('.review-comment')
    ).nativeElement;

    expect(reviewNameElement.textContent).toContain(mockReview['_user_name']);
    expect(reviewDateElement.textContent).toContain(
      mockReview['_created_at'].toDateString()
    );
    expect(reviewCommentElement.textContent).toContain(mockReview['_comment']);
  });

  it('should display rating stars based on the rating value', () => {
    const starElements = fixture.debugElement.queryAll(
      By.css('.review-rating span')
    );
    expect(starElements.length).toBe(mockReview['_rating']);
  });

});
