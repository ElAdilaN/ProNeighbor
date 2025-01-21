import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRegistrationComponent } from './user-registration.component';

describe('UserRegistrationComponent', () => {
  let component: UserRegistrationComponent;
  let fixture: ComponentFixture<UserRegistrationComponent>;
  let compiled: HTMLElement;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserRegistrationComponent],
      imports: [UserRegistrationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UserRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should disable the button initially', () => {
    const button = compiled.querySelector('button') as HTMLButtonElement;
    expect(button.disabled).toBeTrue();
  });


  it('should enable the button when the form is valid', () => {
    const nameInput = compiled.querySelector('#name') as HTMLInputElement;
    const emailInput = compiled.querySelector('#email') as HTMLInputElement;
    const passwordInput = compiled.querySelector('#password') as HTMLInputElement;
    const confirmPasswordInput = compiled.querySelector('#confirm-password') as HTMLInputElement;
    const termsCheckbox = compiled.querySelector('input[type="checkbox"]') as HTMLInputElement;
    const button = compiled.querySelector('button') as HTMLButtonElement;

    nameInput.value = 'John Doe';
    emailInput.value = 'john@example.com';
    passwordInput.value = 'password123';
    confirmPasswordInput.value = 'password123';
    termsCheckbox.checked = true;

    nameInput.dispatchEvent(new Event('input'));
    emailInput.dispatchEvent(new Event('input'));
    passwordInput.dispatchEvent(new Event('input'));
    confirmPasswordInput.dispatchEvent(new Event('input'));
    termsCheckbox.dispatchEvent(new Event('change'));

    fixture.detectChanges();

    expect(button.disabled).toBeFalse();
  });


});
