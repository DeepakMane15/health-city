import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImprestListComponent } from './imprest-list.component';

describe('ImprestListComponent', () => {
  let component: ImprestListComponent;
  let fixture: ComponentFixture<ImprestListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ImprestListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ImprestListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
