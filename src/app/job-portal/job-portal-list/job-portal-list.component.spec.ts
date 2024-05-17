import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobPortalListComponent } from './job-portal-list.component';

describe('JobPortalListComponent', () => {
  let component: JobPortalListComponent;
  let fixture: ComponentFixture<JobPortalListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JobPortalListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JobPortalListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
