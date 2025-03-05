import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ServiceComponent } from './service.component';
import { ServicesService } from '../../../services/AppServices/services.service';
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
  'Category 1',
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
      of(mockCategories as any),
    );

    // Call ngOnInit, which will trigger the service call
    component.ngOnInit();

    // Now we are comparing the Categories class
    expect(component.categories?.Categories).toEqual(mockCategories);
  });
  it('should display the correct form validation errors', () => {
    // Set invalid values for form fields
    component.serviceData.name = '';
    component.serviceData.price = -1;
    component.serviceData.description = '';
    component.serviceData.location = '';
    component.serviceData.category = '';

    fixture.detectChanges();

    // Check if the error messages are displayed correctly
    const nameError = fixture.nativeElement.querySelector('#name-error');
    const priceError = fixture.nativeElement.querySelector('#price-error');
    const descError = fixture.nativeElement.querySelector('#desc-error');
    const locationError =
      fixture.nativeElement.querySelector('#location-error');
    const categoryError =
      fixture.nativeElement.querySelector('#category-error');

    expect(nameError.textContent).toContain('Service name is required');
    expect(priceError.textContent).toContain('Valid price is required');
    expect(descError.textContent).toContain('Description is required');
    expect(locationError.textContent).toContain('Location is required');
    expect(categoryError.textContent).toContain('Please select a category');
  });
  it('should enable the submit button when the form is valid', () => {
    // Set valid values for form fields
    component.serviceData.name = 'Valid Service';
    component.serviceData.price = 50;
    component.serviceData.description = 'This is a valid description';
    component.serviceData.location = 'Valid Location';
    component.serviceData.category = 'Category 1';

    fixture.detectChanges();

    // Check if the submit button is enabled
    const submitButton = fixture.nativeElement.querySelector('button');
    expect(submitButton.disabled).toBeFalse();
  });

  it('should disable the submit button when the form is invalid', () => {
    // Set invalid values for form fields
    component.serviceData.name = '';
    component.serviceData.price = -1;
    component.serviceData.description = '';
    component.serviceData.location = '';
    component.serviceData.category = '';

    fixture.detectChanges();

    // Check if the submit button is disabled
    const submitButton = fixture.nativeElement.querySelector('button');
    expect(submitButton.disabled).toBeTrue();
  });
});
