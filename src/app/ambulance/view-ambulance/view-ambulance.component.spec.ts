import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAmbulanceComponent } from './view-ambulance.component';

describe('ViewAmbulanceComponent', () => {
  let component: ViewAmbulanceComponent;
  let fixture: ComponentFixture<ViewAmbulanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewAmbulanceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewAmbulanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
