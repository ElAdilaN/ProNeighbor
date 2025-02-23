import { Component } from '@angular/core';
import { ReviewListComponent } from '../../Reviews/review-list/review-list.component';

@Component({
  selector: 'app-service-details',
  standalone: true,
  imports: [ReviewListComponent],
  templateUrl: './service-details.component.html',
  styleUrl: './service-details.component.css',
})
export class ServiceDetailsComponent {

}
