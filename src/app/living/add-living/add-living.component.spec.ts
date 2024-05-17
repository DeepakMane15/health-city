import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLivingComponent } from './add-living.component';

describe('AddLivingComponent', () => {
  let component: AddLivingComponent;
  let fixture: ComponentFixture<AddLivingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddLivingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddLivingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
