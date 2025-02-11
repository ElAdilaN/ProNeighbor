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
  user?: User | Provider;

  isProvider: boolean = false;
  isEditMode: boolean = false; // Track edit mode

  services: Service[] = [];
  @ViewChild('nameInput') nameInput: any;
  @ViewChild('emailInput') emailInput: any;
  @ViewChild('phoneInput') phoneInput: any;
  @ViewChild('addressInput') addressInput: any;

  constructor(private userService: UsersService) {}

  ngOnInit(): void {
    this.fetchUserProfile();
  }

  fetchUserProfile(): void {
    this.userService.getUserProfile().subscribe({
      next: (data: any) => {
        console.log('API Response:', data); // Log the entire response
        console.log('User Role:', data.role); // Log the role
        console.log('Expected Provider Role:', ROLS.PROVIDER); //
        if (data.role === ROLS.PROVIDER) {
          this.user = new Provider(
            data.id,
            data.name,
            data.email,
            data.roles,
            new Date(data.created_at),
            data.phone,
            data.address
          );
          console.log(data);
          (this.user as Provider).setServices(data.services);
          this.services = (this.user as Provider).getServices();
          console.log('here ', this.services[0]);
          this.isProvider = true;
        } else {
          console.log('not provider ');
          this.user = new User(
            data.id,
            data.name,
            data.email,
            data.roles,
            new Date(data.created_at),
            data.phone,
            data.address
          );
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
    const updatedName = this.nameInput.nativeElement.value;
    const updatedEmail = this.emailInput.nativeElement.value;
    const updatedPhone = this.phoneInput.nativeElement.value;
    const updatedAddress = this.addressInput.nativeElement.value;
    console.log('new nam3 ', updatedName);
    const updatedUser = new User(
      this.user?.id ?? '',
      updatedName,
      updatedEmail,
      this.user?.roles ?? ROLS.USER, // Provide a default role
      this.user?.created_at ?? new Date(), // Provide a default date
      updatedPhone,
      updatedAddress
    );

    this.userService.updateUserProfile(updatedUser).subscribe({
      next: (response) => {
        console.log('Profile updated successfully:', response);
        this.user = updatedUser; // Update the local user object
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
