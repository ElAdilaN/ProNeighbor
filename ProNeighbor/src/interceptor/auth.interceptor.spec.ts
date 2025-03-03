import { TestBed } from '@angular/core/testing';
import { HttpInterceptorFn, provideHttpClient } from '@angular/common/http';

import { authInterceptor } from './auth.interceptor';
import { AppComponent } from '../app/app.component';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('authInterceptor', () => {
  const interceptor: HttpInterceptorFn = (req, next) =>
    TestBed.runInInjectionContext(() => authInterceptor(req, next));

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [interceptor],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });
});
