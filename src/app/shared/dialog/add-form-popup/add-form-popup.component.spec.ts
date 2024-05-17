import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFormPopupComponent } from './add-form-popup.component';

describe('AddFormPopupComponent', () => {
  let component: AddFormPopupComponent;
  let fixture: ComponentFixture<AddFormPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddFormPopupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddFormPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
