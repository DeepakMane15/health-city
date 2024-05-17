import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatRadioChange } from '@angular/material/radio';
import { Router } from '@angular/router';
import { APIConstant } from 'src/app/common/constants/APIConstant';
import { UserTypeConstant } from 'src/app/common/constants/UserTypeConstant';
import { PatientModel } from 'src/app/common/models/PatientModel';
import { ApiService } from 'src/app/shared/services/api/api.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { GoogleService } from 'src/app/shared/services/google/google.service';

@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.component.html',
  styleUrls: ['./add-patient.component.scss'],
})
export class AddPatientComponent implements OnInit {
  public showSpinner: Boolean = false;
  public isUnameAvailable: Boolean = true;
  public isChecking: Boolean = false;
  public timezones: any;
  public addressPredictions: any;
  public patientData!: PatientModel;
  @Input() fromPopup: boolean = false;
  @Output() formSubmitted: EventEmitter<void> = new EventEmitter<void>();

  patientForm = this.fb.group({
    id: 0,
    customer_id: 0,
    name: ['', Validators.required],
    address: ['', Validators.required],
    timeZone: ['', Validators.required],
    telephone: '',
    mobile: ['', Validators.required],
    cperson1: ['', Validators.required],
    cperson2: ['', Validators.required],
    cphone1: ['', Validators.required],
    cphone2: ['', Validators.required],
    specialNotes: '',
    internalNotes: '',
  });

  constructor(
    private fb: FormBuilder,
    private _apiService: ApiService,
    private router: Router,
    private _authService: AuthService,
    private _googleService: GoogleService
  ) {}

  ngOnInit(): void {
    this.getTimeZones();
    this.patientData = history.state.patientData;
    this.patientForm.patchValue({
      id: this.patientData.id,
      customer_id: this.patientData.customer_id,
      name: this.patientData.name,
      address: this.patientData.address,
      timeZone: this.patientData.time_zone,
      telephone: this.patientData.telephone,
      mobile: this.patientData.mobile,
      cperson1: this.patientData['contactPerson1_name'],
      cperson2: this.patientData['contactPerson2_name'],
      cphone1: this.patientData['contactPerson1_phone'],
      cphone2: this.patientData['contactPerson2_phone'],
      specialNotes: this.patientData['special_notes'],
      internalNotes: this.patientData['internal_notes'],
    });
  }

  onSubmit(): void {
    if (this.patientForm.valid) {
      const formModel: PatientModel = this.patientForm.value as PatientModel;
      const formData = new FormData();

      // Convert JSON object to FormData
      for (const key of Object.keys(formModel)) {
        const value = formModel[key];
        formData.append(key, value);
      }
      this.showSpinner = true;
      this._apiService
        .post(
          this.patientData ? APIConstant.EDIT_PATIENT : APIConstant.ADD_PATIENT,
          formData
        )
        .subscribe(
          (res: any) => {
            if (res && res.status) {
              this.showSpinner = false;
              if (this.fromPopup) this.formSubmitted.emit();
              else this.router.navigate(['/patients']);
            } else {
              this.showSpinner = false;
              if (this.fromPopup) this.formSubmitted.emit();
            }
          },
          (error) => {
            this.showSpinner = false;
            if (this.fromPopup) this.formSubmitted.emit();
          }
        );
    }
    return;
  }

  handleMobileNumber(event: Event, field: string) {
    const inputElement = event.target as HTMLInputElement;
    let enteredValue = inputElement.value;

    enteredValue = enteredValue.replace(/\D/g, ''); // Allow only numbers
    enteredValue = enteredValue.slice(0, 10); // Limit to 10 characters

    // Format the phone number as (XXX) XXX-XXXX
    if (enteredValue.length > 3) {
      enteredValue = `(${enteredValue.slice(0, 3)}) ${enteredValue.slice(3)}`;
    }
    if (enteredValue.length > 9) {
      enteredValue = `${enteredValue.slice(0, 9)}-${enteredValue.slice(9)}`;
    }

    // Update form control value and validate
    if (field === 'phone')
      this.patientForm.patchValue(
        { mobile: enteredValue },
        { emitEvent: false }
      );
    else if (field === 'telephone')
      this.patientForm.patchValue(
        { telephone: enteredValue },
        { emitEvent: false }
      );

    this.patientForm.get(field)?.markAsTouched(); // Mark phone as touched
  }

  public getTimeZones() {
    this.showSpinner = true;
    this._apiService.get(APIConstant.GET_TIMEZONE).subscribe(
      (res: any) => {
        if (res && res.status) {
          this.showSpinner = false;
          this.timezones = res.data;
        } else {
          console.error('Timexone fetch failed');
        }
      },
      (error) => {
        this.showSpinner = false;
        console.error('Timexone fetch failed', error);
      }
    );
  }
  public handleCancel() {
    if (this.fromPopup) this.formSubmitted.emit();
    else
      this.router.navigate(['patients'], {
        state: { patientData: this.patientData },
      });
  }
  public navigateBack() {
    if (this.fromPopup) this.formSubmitted.emit();
    else this.router.navigate(['/patients']);
  }
  closeDialog() {
    this.formSubmitted.emit();
  }
}
