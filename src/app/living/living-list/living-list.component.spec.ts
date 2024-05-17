import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LivingListComponent } from './living-list.component';

describe('LivingListComponent', () => {
  let component: LivingListComponent;
  let fixture: ComponentFixture<LivingListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LivingListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LivingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
