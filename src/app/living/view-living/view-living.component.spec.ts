import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewLivingComponent } from './view-living.component';

describe('ViewLivingComponent', () => {
  let component: ViewLivingComponent;
  let fixture: ComponentFixture<ViewLivingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewLivingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewLivingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
