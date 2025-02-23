import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ServiceDetailsComponent } from './service-details.component';
import { ServicesService } from '../../../services/services.service';
import { ActivatedRoute } from '@angular/router';
import { of, throwError } from 'rxjs';
import { Service } from '../../../Model/servicesProvider/service.model';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';

describe('ServiceDetailsComponent', () => {
  let component: ServiceDetailsComponent;
  let fixture: ComponentFixture<ServiceDetailsComponent>;
  let servicesService: ServicesService;
  let mockActivatedRoute: any;

  beforeEach(async () => {
    mockActivatedRoute = {
      paramMap: of({ get: (key: string) => '123' }), // Simulate route params
    };

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ServicesService,
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ServiceDetailsComponent);
    component = fixture.componentInstance;
    servicesService = TestBed.inject(ServicesService);
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should load service details on init', () => {
    const mockService: Service = new Service(
      '123',
      'Test Service',
      50,
      'Fixing Pipes',
      'New York',
      new Date(),
      'Plumbing'
    );

    spyOn(servicesService, 'getServiceById').and.returnValue(of(mockService));

    component.ngOnInit();
    fixture.detectChanges();
    fixture.whenStable();
    expect(servicesService.getServiceById).toHaveBeenCalledWith('123');
    expect(component.isLoading).toBeFalse();
  });
});
