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

    authGuard(route, state);

    expect(authService.getToken).toHaveBeenCalled(); // Ensure token check was called
    expect(router.navigate).toHaveBeenCalledWith(['/login']); // Ensure redirection to login
  });
});
