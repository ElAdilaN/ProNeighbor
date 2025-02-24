import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  provideHttpClientTesting,
} from '@angular/common/http/testing'; // Import HttpClientTestingModule
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';
import { of } from 'rxjs';
import { provideRouter, Router } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { AuthService } from '../../../services/auth.service';
import { HomeComponent } from '../../home/home.component';
import { ROLS } from '../../../Model/user/enum';
import { authGuard } from '../../../guards/auth.guard';
import { RouterTestingModule } from '@angular/router/testing';

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

    spyOn(authService, 'login').and.returnValue(of(mockResponse)); // Mock login method
    component.loginData = {
      email: 'johndoe@example.com',
      password: 'password123',
    };

    // Trigger login
    component.onLogin();

    // Wait for any async operations to complete
    fixture.detectChanges();

    // Check that token is stored in localStorage
    expect(localStorage.getItem('authToken')).toBe('mock-jwt-token');
  });

  it('should disable submit button when waiting for login', () => {
    const mockResponse = {
      message: 'Successfully logged in',
      token: 'mock-jwt-token',
      user: { id: 1, name: 'John Doe', email: 'johndoe@example.com' },
    };

    spyOn(authService, 'login').and.returnValue(of(mockResponse));
    component.loginData = {
      email: 'johndoe@example.com',
      password: 'password123',
    };

    const submitButton: HTMLButtonElement =
      fixture.nativeElement.querySelector('button');

    fixture.detectChanges(); // Ensure the button is rendered

    // Initially, button should not be disabled
    expect(submitButton.disabled).toBeFalsy();

    submitButton.click();
    fixture.detectChanges(); // Trigger change detection after click

    // After clicking, the button should be disabled
    expect(submitButton.disabled).toBeTruthy();
  });
});
describe('Home Component Routing - Token Based Access', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let router: Router;
  let authService: AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent, LoginComponent],
      providers: [
        AuthService,
        {
          provide: Router,
          useValue: jasmine.createSpyObj('Router', ['navigate']),
        },
        provideHttpClientTesting(),
        provideHttpClient(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    authService = TestBed.inject(AuthService);
  });

  it('should redirect to login if no token is available', async () => {
    // Mocking getToken and clearToken methods
    spyOn(authService, 'getToken').and.returnValue(null);
    spyOn(authService, 'clearToken');

    // Mock route and state
    const route: any = { data: { roles: [ROLS.USER, ROLS.PROVIDER] } };
    const state: any = {};

    // Call the guard directly to test its behavior
    const result = authGuard(route, state);

    expect(result).toBeFalse(); // Expect the guard to return false
    expect(authService.clearToken).toHaveBeenCalled(); // Expect clearToken to have been called
    expect(router.navigate).toHaveBeenCalledWith(['/login']); // Expect the router to navigate to login
  });

  it('should allow access to home page if a token is present', async () => {
    spyOn(authService, 'getToken').and.returnValue('validToken');

    // Navigate to home page
    router.navigate(['/home']);
    fixture.detectChanges();
    await fixture.whenStable();

    expect(router.url).toBe('/home'); // Expect the URL to be /home
  });
});
