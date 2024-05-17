import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignmentStatusProComponent } from './assignment-status-pro.component';

describe('AssignmentStatusProComponent', () => {
  let component: AssignmentStatusProComponent;
  let fixture: ComponentFixture<AssignmentStatusProComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssignmentStatusProComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AssignmentStatusProComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
