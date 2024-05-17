import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionStatusProComponent } from './transaction-status-pro.component';

describe('TransactionStatusProComponent', () => {
  let component: TransactionStatusProComponent;
  let fixture: ComponentFixture<TransactionStatusProComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransactionStatusProComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TransactionStatusProComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
