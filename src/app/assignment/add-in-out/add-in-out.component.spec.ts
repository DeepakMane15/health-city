import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddInOutComponent } from './add-in-out.component';

describe('AddInOutComponent', () => {
  let component: AddInOutComponent;
  let fixture: ComponentFixture<AddInOutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddInOutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddInOutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
