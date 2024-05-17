import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddJobOpeningComponent } from './add-job-opening.component';

describe('AddJobOpeningComponent', () => {
  let component: AddJobOpeningComponent;
  let fixture: ComponentFixture<AddJobOpeningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddJobOpeningComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddJobOpeningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
