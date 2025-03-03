import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, of } from 'rxjs';
import { ServicesService } from '../../../services/services.service';
import { ServiceListComponent } from './service-list.component';

describe('ServiceListComponent', () => {
  let component: ServiceListComponent;
  let fixture: ComponentFixture<ServiceListComponent>;
  let servicesService: ServicesService;
  let activatedRouteMock: any;

  beforeEach(async () => {
    activatedRouteMock = {
      paramMap: new BehaviorSubject({
        get: (key: string) => (key === 'id' ? '123' : null),
      }),
    }

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ServicesService,
        { provide: ActivatedRoute, useValue: activatedRouteMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ServiceListComponent);
    component = fixture.componentInstance;
    servicesService = TestBed.inject(ServicesService);
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });


});
