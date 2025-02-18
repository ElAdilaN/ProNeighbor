import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ServiceComponent } from './service.component';
import { ServicesService } from '../../../services/services.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import {
  Categories,
  Category,
  Service,
} from '../../../Model/servicesProvider/service.model';

// Mock Categories wrapped in Categories class
const mockCategories: Category[] = [
  new Category('Category 1'),
  new Category('Category 2'),
  new Category('Category 3'),
];

// Create mock service data
const mockService = new Service(
  'BFB2FDF9-07FF-4360-BE9E-222C2EAA4AED',
  'Sample Service',
  100,
  'This is a description of the service',
  'Sample Location',
  new Date(),
  'Category 1'
);

describe('ServiceComponent', () => {
  let component: ServiceComponent;
  let fixture: ComponentFixture<ServiceComponent>;
  let servicesService: ServicesService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ServicesService],
    }).compileComponents();

    fixture = TestBed.createComponent(ServiceComponent);
    component = fixture.componentInstance;
    servicesService = TestBed.inject(ServicesService);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
  it('should initialize categories on component load', () => {
    // Spy on the 'getAllCategories' method and mock the return value as an instance of Categories
    spyOn(servicesService, 'getAllCategories').and.returnValue(
      of(mockCategories as any)
    );

    // Call ngOnInit, which will trigger the service call
    component.ngOnInit();

    // Now we are comparing the Categories class
    expect(component.categories?.Categories).toEqual(mockCategories);
  });
});
