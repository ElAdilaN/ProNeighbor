import { Component, OnInit } from '@angular/core';
import { Provider, User } from '../../../../Model/user/user.model';
import { UsersService } from '../../../../services/users.service';
import { FormsModule } from '@angular/forms';
import { ROLS } from '../../../../Model/user/enum';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css',
})
export class UserProfileComponent implements OnInit {
  user: User | Provider;

  constructor(private usersService: UsersService) {
    // Initialize the user object with default values
    this.user = new User(
      '', // id
      '', // name
      '', // email
      ROLS.USER, // roles (assuming ROLS is an enum)
      new Date(), // created_at
      undefined, // phone (optional)
      undefined // address (optional)
    );
  }

  ngOnInit(): void {
    this.fetchUserProfile();
  }

  fetchUserProfile(): void {
    this.usersService.getUserProfile().subscribe(
      (profile) => {
        // Assign the fetched profile to the user object
        this.user = new User(
          profile.id,
          profile.name,
          profile.email,
          profile.roles,
          new Date(profile.created_at),
          profile.phone,
          profile.address
        );
      },
      (error) => {
        console.error('Failed to fetch user profile:', error);
      }
    );
  }

  updateProfile(): void {
    // Call the service to update the user profile
    this.usersService.updateUserProfile(this.user).subscribe(
      (response) => {
        console.log('Profile updated successfully:', response);
      },
      (error) => {
        console.error('Failed to update profile:', error);
      }
    );
  }
}
