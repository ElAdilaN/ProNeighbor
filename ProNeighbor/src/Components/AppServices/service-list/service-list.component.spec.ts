import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ServiceListComponent } from './service-list.component';
import { ServicesService } from '../../../services/services.service';
import { of, throwError } from 'rxjs';
import { Service } from '../../../Model/servicesProvider/service.model';
import { By } from '@angular/platform-browser';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';

describe('ServiceListComponent', () => {
  let component: ServiceListComponent;
  let fixture: ComponentFixture<ServiceListComponent>;
  let servicesService: ServicesService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ServicesService,
        {
          provide: ActivatedRoute,
          useValue: {}, // Mocking ActivatedRoute
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ServiceListComponent);
    component = fixture.componentInstance;
    servicesService = TestBed.inject(ServicesService);
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should call getAllServices() on init and load services', () => {
    const mockServices: Service[] = [
      new Service(
        '123',
        'Test Service',
        50,
        'Fixing Pipes',
        'New York',
        new Date(),
        'Plumbing'
      ),
      new Service(
        '456',
        'Test Service',
        60,
        'Catalan teacher',
        'Olot',
        new Date(),
        'Teaching'
      ),
    ];

    spyOn(servicesService, 'getAllServices').and.returnValue(of(mockServices));

    component.ngOnInit();
    fixture.detectChanges();

    expect(servicesService.getAllServices).toHaveBeenCalled();
    expect(component.services.length).toBe(2);
  });

  it('should handle error when getAllServices() fails', () => {
    spyOn(servicesService, 'getAllServices').and.returnValue(
      throwError(() => new Error('API failure'))
    );

    component.ngOnInit();
    fixture.detectChanges();

    expect(servicesService.getAllServices).toHaveBeenCalled();
    expect(component.errorMessage).toBe('Failed to load services');
    expect(component.isLoading).toBeFalse();
  });

  it('should show loading message while fetching services', () => {
    component.isLoading = true;
    fixture.detectChanges();

    const loadingElement = fixture.debugElement.query(By.css('[role="alert"]'));
    expect(loadingElement.nativeElement.textContent).toContain(
      'Loading services...'
    );
  });
});
