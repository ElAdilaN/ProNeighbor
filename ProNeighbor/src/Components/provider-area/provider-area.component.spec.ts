import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderAreaComponent } from './provider-area.component';

describe('ProviderAreaComponent', () => {
  let component: ProviderAreaComponent;
  let fixture: ComponentFixture<ProviderAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProviderAreaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProviderAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
