import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewJobOpeningComponent } from './view-job-opening.component';

describe('ViewJobOpeningComponent', () => {
  let component: ViewJobOpeningComponent;
  let fixture: ComponentFixture<ViewJobOpeningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewJobOpeningComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewJobOpeningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
