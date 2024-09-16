import { DatePipe } from '@angular/common';
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
  selector: 'app-add-driver',
  templateUrl: './add-driver.component.html',
  styleUrl: './add-driver.component.scss',
  providers: [DatePipe],
})
export class AddDriverComponent implements OnInit {
  public showSpinner: Boolean = false;
  public isUnameAvailable: Boolean = true;
  public isChecking: Boolean = false;
  public timezones: any;
  public addressPredictions: any;
  public vehicleData!: any;
  public driverData!: any;
  public patientData!: PatientModel;
  @Input() fromPopup: boolean = false;
  @Output() formSubmitted: EventEmitter<void> = new EventEmitter<void>();

  patientForm = this.fb.group({
    id: 0,
    name: ['', Validators.required],
    date: ['', Validators.required],
    pickup: ['', Validators.required],
    destination: ['', Validators.required],
    phone: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private _apiService: ApiService,
    private router: Router,
    private _authService: AuthService,
    private _googleService: GoogleService,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.patientData = history.state.patientData;
    this.patientForm.patchValue({
      id: this.patientData.id,
      name: this.patientData['name'],
      date: this.patientData['date'],
      pickup: this.patientData['pickup'],
      destination: this.patientData['destination'],
      phone: this.patientData['phone'],
    });
  }

  getVehicles() {
    this.showSpinner = true;
    // const fd = new FormData();
    // fd.append("type", "2");
    let fd = { type: '2' };
    this._apiService.post(APIConstant.SNM_GET, fd).subscribe(
      (res: any) => {
        if (res && res.status) {
          this.vehicleData = res.data;
          this.showSpinner = false;
        }
      },
      (error) => {
        this.showSpinner = false;
        if (this.fromPopup) this.formSubmitted.emit();
      }
    );
  }

  onSubmit(): void {
    if (this.patientForm.valid) {
      // Initialize an empty object
      const jsonObject: { [key: string]: any } = {};

      // Extract the form values
      const formModel: any = this.patientForm.value;

      // Loop through the formModel keys and populate the JSON object
      for (const key of Object.keys(formModel)) {
        if (key === 'date') {
          // Format the date
          const date = this.datePipe.transform(
            this.patientForm.get('date')?.value,
            'MM-dd-yyyy'
          );
          jsonObject[key] = date || ''; // Handle null or undefined
        } else {
          // Add other values directly
          jsonObject[key] = formModel[key];
        }
      }

      // Add additional property
      jsonObject['type'] = '6';


      this.showSpinner = true;
      this._apiService
        .post(
          this.patientData ? APIConstant.SNM_EDIT : APIConstant.SNM_SAVE,
          jsonObject
        )
        .subscribe(
          (res: any) => {
            if (res && res.status) {
              this.showSpinner = false;
              if (this.fromPopup) this.formSubmitted.emit();
              else this.router.navigate(['/driver']);
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
    // if (field === 'phone')
    //   this.patientForm.patchValue(
    //     { mobile: enteredValue },
    //     { emitEvent: false }
    //   );
    // else if (field === 'telephone')
    //   this.patientForm.patchValue(
    //     { telephone: enteredValue },
    //     { emitEvent: false }
    //   );

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
      this.router.navigate(['driver'], {
        state: { patientData: this.patientData },
      });
  }
  public navigateBack() {
    if (this.fromPopup) this.formSubmitted.emit();
    else this.router.navigate(['/driver']);
  }
  closeDialog() {
    this.formSubmitted.emit();
  }
}
