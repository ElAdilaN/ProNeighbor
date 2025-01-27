import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // Import HttpClientTestingModule
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';
import { AuthService } from '../../../services/auth.service';
import { of } from 'rxjs';
import { HomeComponent } from '../../home/home.component';
import { provideRouter, Router } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { ROLS } from '../../../enums/enum';
import { authGuard } from '../../../guards/auth.guard';

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
describe('Home Component Routing - Token Based Access', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let router: Router;
  let authService: AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent, LoginComponent],
      providers: [
        provideRouter([
          { path: 'home', component: HomeComponent },
          { path: 'login', component: LoginComponent },
        ]),
        provideHttpClient(),
        AuthService,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    authService = TestBed.inject(AuthService);
  });

  it('should redirect to login if no token is available', async () => {
    spyOn(authService, 'getToken').and.returnValue(null);

    // Mock route and state
    const route: any = { data: { roles: [ROLS.USER, ROLS.PROVIDER] } };
    const state: any = {};

    const result = authGuard(route, state);

    expect(result).toBeFalse();
    expect(authService.clearToken).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should allow access to home page if a token is present', async () => {
    spyOn(authService, 'getToken').and.returnValue('validToken');

    router.navigate(['/home']);
    fixture.detectChanges();
    await fixture.whenStable();

    expect(router.url).toBe('/home');
  });
});
