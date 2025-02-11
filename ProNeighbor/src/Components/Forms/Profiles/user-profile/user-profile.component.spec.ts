import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsersService } from '../../../../services/users.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { UserProfileComponent } from './user-profile.component';

describe('UserProfileComponent', () => {
  let component: UserProfileComponent;
  let fixture: ComponentFixture<UserProfileComponent>;
  let userService: UsersService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, FormsModule],
      providers: [UsersService],
    }).compileComponents();

    fixture = TestBed.createComponent(UserProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should display "Modify Profile" button and have read-only inputs when not in edit mode', () => {
    // Arrange
    component.isEditMode = false;
    fixture.detectChanges();

    const modifyButton = fixture.nativeElement.querySelector('button');
    const nameInput = fixture.nativeElement.querySelector('#name');
    const emailInput = fixture.nativeElement.querySelector('#email');
    const phoneInput = fixture.nativeElement.querySelector('#phone');
    const addressInput = fixture.nativeElement.querySelector('#address');

    expect(modifyButton.textContent).toContain('Modify Profile');
    expect(nameInput.readOnly).toBeTrue();
    expect(emailInput.readOnly).toBeTrue();
    expect(phoneInput.readOnly).toBeTrue();
    expect(addressInput.readOnly).toBeTrue();
  });

  it('should display "Save Changes" and "Cancel" buttons when "Modify Profile" is clicked', () => {
    // Arrange
    component.isEditMode = false;
    fixture.detectChanges();

    // Act
    const modifyButton = fixture.nativeElement.querySelector('button');
    modifyButton.click();
    fixture.detectChanges();

    const saveButton = fixture.nativeElement.querySelector(
      'button:nth-of-type(1)'
    );
    const cancelButton = fixture.nativeElement.querySelector(
      'button:nth-of-type(2)'
    );

    // Assert
    expect(saveButton.textContent).toContain('Save Changes');
    expect(cancelButton.textContent).toContain('Cancel');
  });
  it('should make input fields editable when in edit mode', () => {
    // Arrange
    component.isEditMode = true;
    fixture.detectChanges();
  
    // Act
    const nameInput = fixture.nativeElement.querySelector('#name');
    const emailInput = fixture.nativeElement.querySelector('#email');
    const phoneInput = fixture.nativeElement.querySelector('#phone');
    const addressInput = fixture.nativeElement.querySelector('#address');
  
    // Assert
    expect(nameInput.readOnly).toBeFalse();
    expect(emailInput.readOnly).toBeFalse();
    expect(phoneInput.readOnly).toBeFalse();
    expect(addressInput.readOnly).toBeFalse();
  });

  it('should revert to read-only mode when "Cancel" is clicked', () => {
    // Arrange
    component.isEditMode = true;
    fixture.detectChanges();
  
    // Act
    const cancelButton = fixture.nativeElement.querySelector('button:nth-of-type(2)');
    cancelButton.click();
    fixture.detectChanges();
  
    const nameInput = fixture.nativeElement.querySelector('#name');
    const emailInput = fixture.nativeElement.querySelector('#email');
    const phoneInput = fixture.nativeElement.querySelector('#phone');
    const addressInput = fixture.nativeElement.querySelector('#address');
  
    // Assert
    expect(component.isEditMode).toBeFalse();
    expect(nameInput.readOnly).toBeTrue();
    expect(emailInput.readOnly).toBeTrue();
    expect(phoneInput.readOnly).toBeTrue();
    expect(addressInput.readOnly).toBeTrue();
  });

});
