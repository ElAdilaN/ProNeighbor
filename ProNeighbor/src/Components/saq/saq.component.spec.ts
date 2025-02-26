import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SaqComponent } from './saq.component';

describe('SAQComponent', () => {
  let component: SaqComponent;
  let fixture: ComponentFixture<SaqComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SaqComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SaqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
