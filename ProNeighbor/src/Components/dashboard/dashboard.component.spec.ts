import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { AuthService } from '../../services/auth.service';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { ROLS } from '../../Model/user/enum';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let authService: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', [
      'getUserType',
      'getUserIdFromToken',
    ]);

    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [{ provide: AuthService, useValue: authServiceSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should not display user or provider links if role is null', () => {
    authService.getUserType.and.returnValue(null);
    fixture.detectChanges();

    const userDashboardButton = fixture.debugElement.query(
      By.css('button[routerLink="userArea"]')
    );
    const providerDashboardButton = fixture.debugElement.query(
      By.css('button[routerLink="providerArea"]')
    );

    expect(userDashboardButton).toBeNull();
    expect(providerDashboardButton).toBeNull();
  });
});
