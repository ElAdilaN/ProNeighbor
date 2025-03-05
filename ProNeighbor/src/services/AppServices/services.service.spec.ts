import { TestBed } from '@angular/core/testing';
import { ServicesService } from './services.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('ServicesService', () => {
  let service: ServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ServicesService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });

    service = TestBed.inject(ServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
