import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ServiceCardComponent } from './service-card.component';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { Service } from '../../../Model/servicesProvider/service.model';

describe('ServiceCardComponent', () => {
  let component: ServiceCardComponent;
  let fixture: ComponentFixture<ServiceCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ServiceCardComponent);
    component = fixture.componentInstance;
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should display service details', () => {
    const mockService: Service = new Service(
      '123',
      'Test Service',
      50,
      'Fixing Pipes',
      'New Yok',
      new Date(),
      'Plumbing'
    );

    component.service = mockService;
    fixture.detectChanges();

    const nameElement = fixture.debugElement.query(By.css('h3')).nativeElement;
    const categoryElement = fixture.debugElement.query(
      By.css('p strong')
    ).nativeElement;
    const priceElement = fixture.debugElement.query(
      By.css('p:nth-of-type(3) span')
    ).nativeElement;
    const locationElement = fixture.debugElement.query(
      By.css('p:nth-of-type(2) span')
    ).nativeElement;
    const descriptionElement = fixture.debugElement.query(
      By.css('p:nth-of-type(4) span')
    ).nativeElement;

    expect(nameElement.textContent).toContain(mockService.name);
    expect(categoryElement.textContent).toContain('Category:');
    expect(priceElement.textContent).toContain(mockService.price + '$');
    expect(locationElement.textContent).toContain(mockService.location);
    expect(descriptionElement.textContent).toContain(mockService.description);
  });
});
