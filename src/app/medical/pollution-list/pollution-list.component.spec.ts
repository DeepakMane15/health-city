import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PollutionListComponent } from './pollution-list.component';

describe('PollutionListComponent', () => {
  let component: PollutionListComponent;
  let fixture: ComponentFixture<PollutionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PollutionListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PollutionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
