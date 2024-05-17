import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LivingBoardComponent } from './living-board.component';

describe('LivingBoardComponent', () => {
  let component: LivingBoardComponent;
  let fixture: ComponentFixture<LivingBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LivingBoardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LivingBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
