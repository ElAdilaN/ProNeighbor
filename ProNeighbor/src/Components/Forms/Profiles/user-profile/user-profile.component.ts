import { Component, OnInit, ViewChild } from '@angular/core';
import { Provider, User } from '../../../../Model/user/user.model';
import { UsersService } from '../../../../services/users.service';
import { FormsModule } from '@angular/forms';
import { ROLS } from '../../../../Model/user/enum';
import { Service } from '../../../../Model/servicesProvider/service.model';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css',
})
export class UserProfileComponent implements OnInit {
  user?: Provider;

  isProvider: boolean = false;
  isEditMode: boolean = false; // Track edit mode

  services: Service[] = [];


  constructor(private userService: UsersService) {}

  ngOnInit(): void {
    this.fetchUserProfile();
  }

  fetchUserProfile(): void {
    this.userService.getUserProfile().subscribe({
      next: (data: any) => {
        this.user = new Provider(
          data.id,
          data.name,
          data.email,
          data.roles,
          new Date(data.created_at),
          data.phone,
          data.address
        );
        if (data.role === ROLS.PROVIDER) {
          this.user.setServices(data.services);
          this.isProvider = true;
        } else {
          (this.user as User) = this.user as User; // convert from provider to user
        }
      },
      error: (err) => {
        console.error('Error fetching user profile:', err);
      },
    });
  }
  enableEditMode(): void {
    this.isEditMode = true;
  }

  updateProfile(): void {
    this.userService.updateUserProfile(this.user).subscribe({
      next: (response) => {
        console.log('Profile updated successfully:', response);
      },
      error: (err) => {
        console.error('Failed to update profile:', err);
      },
    });
  }
  /* trackService(index: number, service: Service): string {
    return service.getId();
  } */
  saveChanges(): void {
 

   
    this.userService.updateUserProfile(this.user).subscribe({
      next: (response) => {
        console.log('Profile updated successfully:', response);
        // this.user = updatedUser; // Update the local user object
        this.isEditMode = false; // Exit edit mode
      },
      error: (err) => {
        console.error('Failed to update profile:', err);
      },
    });
  }

  // Cancel edit mode
  cancelEdit(): void {
    this.isEditMode = false;
  }
}
