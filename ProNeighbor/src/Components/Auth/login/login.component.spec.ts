import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  provideHttpClientTesting,
} from '@angular/common/http/testing'; // Import HttpClientTestingModule
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';
import { of } from 'rxjs';
import { ActivatedRoute, provideRouter, Router } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { AuthService } from '../../../services/auth.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginComponent, FormsModule, HttpClientTestingModule], // Include HttpClientTestingModule and LoginComponent

      providers: [
        AuthService,
        provideHttpClient(),
        provideHttpClientTesting(),
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: 1 }), // Mock route parameters if needed
            snapshot: { paramMap: { get: () => '1' } },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    authService = TestBed.inject(AuthService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
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

    submitButton.click();
    fixture.detectChanges(); // Trigger change detection after click

    // After clicking, the button should be disabled
    expect(submitButton.disabled).toBeTruthy();
  });
});
