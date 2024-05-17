import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalListComponent } from './medical-list.component';

describe('MedicalListComponent', () => {
  let component: MedicalListComponent;
  let fixture: ComponentFixture<MedicalListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedicalListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedicalListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
