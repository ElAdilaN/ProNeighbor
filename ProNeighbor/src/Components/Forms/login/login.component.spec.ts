import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // Import HttpClientTestingModule
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';
import { AuthService } from '../../../auth.service';
import { of } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginComponent, FormsModule, HttpClientTestingModule], // Include HttpClientTestingModule and LoginComponent
      providers: [AuthService],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    authService = TestBed.inject(AuthService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should store token in local storage on successful login', () => {
    const mockResponse = {
      message: 'Successfully logged in',
      token: 'mock-jwt-token',
      user: { id: 1, name: 'John Doe', email: 'johndoe@example.com' },
    };

    spyOn(authService, 'login').and.returnValue(of(mockResponse)); // Mock AuthService login method
    component.loginData = {
      email: 'johndoe@example.com',
      password: 'password123',
    };

    component.onLogin();

    expect(localStorage.getItem('authToken')).toBe('mock-jwt-token');
  });

  it('should disable submit button when waiting for login', () => {
    const mockResponse = {
      message: 'Successfully logged in',
      token: 'mock-jwt-token',
      user: { id: 1, name: 'John Doe', email: 'johndoe@example.com' },
    };

    spyOn(authService, 'login').and.returnValue(of(mockResponse));
    const fixture = TestBed.createComponent(LoginComponent);
    fixture.detectChanges();

    const submitButton: HTMLButtonElement =
      fixture.nativeElement.querySelector('button');
    expect(submitButton.disabled).toBeFalsy();

    submitButton.click();
    fixture.detectChanges();

    expect(submitButton.disabled).toBeTruthy();
  });
});
