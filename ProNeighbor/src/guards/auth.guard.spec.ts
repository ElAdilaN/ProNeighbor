import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Routes,
} from '@angular/router';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { HomeComponent } from '../Components/home/home.component';
import { authGuard } from '../guards/auth.guard';
import { ROLS } from '../enums/enum';
import { AuthService } from '../services/auth.service';
// Define mock routes with guard applied
const routes: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [authGuard] }, // Home route protected by the authGuard
  { path: 'login', component: HomeComponent }, // Mock LoginComponent for redirection
];
describe('Auth-Guards', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let authService: AuthService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [
        provideRouter(routes),
        provideHttpClient(),
        provideHttpClientTesting(),
        AuthService,
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Trigger change detection
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
    spyOn(router, 'navigate');
  });

  it('should deny access to home if no token exists', () => {
    spyOn(authService, 'getToken').and.returnValue(null); // Simulate no token

    const route = {} as ActivatedRouteSnapshot; // Mock route object
    const state = {} as RouterStateSnapshot; // Mock state object
    // Run the guard in an Angular injection context
    const canActivate = TestBed.runInInjectionContext(() =>
      authGuard(route, state)
    );
    // Assert that the guard denies access and redirects to login
    expect(canActivate).toBe(false);
    expect(authService.getToken).toHaveBeenCalled(); // Ensure token check was called
    expect(router.navigate).toHaveBeenCalledWith(['/login']); // Ensure redirection to login
  });

  it('should allow access to home if a valid token exists', () => {
    spyOn(authService, 'getToken').and.returnValue('validToken'); // Simulate valid token
    spyOn(authService, 'getUserType').and.returnValue(ROLS.USER); // Simulate valid user type

    const route = {
      data: { roles: [ROLS.USER, ROLS.PROVIDER] }, // Simulate route requiring USER or PROVIDER role
    } as unknown as ActivatedRouteSnapshot;

    const state = {} as RouterStateSnapshot; // Mock state object

    // Run the guard in an Angular injection context
    const canActivate = TestBed.runInInjectionContext(() =>
      authGuard(route, state)
    );

    // Assert that the guard allows access and does not redirect
    expect(canActivate).toBe(true);
    expect(authService.getToken).toHaveBeenCalled(); // Ensure token check was called
    expect(authService.getUserType).toHaveBeenCalledWith('validToken'); // Ensure user type check was called with valid token
    expect(router.navigate).not.toHaveBeenCalled(); // No redirection should occur
  });

  it('should redirect to unauthorized if token role does not match required roles', () => {
    spyOn(authService, 'getToken').and.returnValue('validToken'); // Simulate valid token
    spyOn(authService, 'getUserType').and.returnValue(ROLS.PROVIDER); // Simulate invalid role (PROVIDER)

    const route = {
      data: { roles: [ROLS.USER] }, // Simulate route requiring USER role
    } as unknown as ActivatedRouteSnapshot;

    const state = {} as RouterStateSnapshot; // Mock state object

    // Run the guard in an Angular injection context
    const canActivate = TestBed.runInInjectionContext(() =>
      authGuard(route, state)
    );

    // Assert that the guard denies access and redirects to unauthorized
    expect(canActivate).toBe(false);
    expect(authService.getToken).toHaveBeenCalled(); // Ensure token check was called
    expect(authService.getUserType).toHaveBeenCalledWith('validToken'); // Ensure user type check was called with valid token
    expect(router.navigate).toHaveBeenCalledWith(['/unauthorized']); // Ensure redirection to unauthorized
  });
});
