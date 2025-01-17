import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatRadioChange } from '@angular/material/radio';
import { Router } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { APIConstant } from 'src/app/common/constants/APIConstant';
import { UserTypeConstant } from 'src/app/common/constants/UserTypeConstant';
import { PatientModel } from 'src/app/common/models/PatientModel';
import { ApiService } from 'src/app/shared/services/api/api.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { GoogleService } from 'src/app/shared/services/google/google.service';

@Component({
  selector: 'app-add-fuel',
  templateUrl: './add-fuel.component.html',
  styleUrl: './add-fuel.component.scss',
})
export class AddFuelComponent implements OnInit {
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
    receipt_no: ['', Validators.required],
    vehicle: ['', Validators.required],
    fuel_in_litre: ['', Validators.required],
    rate: ['', Validators.required],
    amount: ['', Validators.required],
    amount_paid: ['', Validators.required],
    transaction_type: ['', Validators.required],
    // refill_in: ['', Validators.required],
    refill_from: ['', Validators.required],
    present_km: ['', Validators.required],
    // refill_to: ['', Validators.required],
  });

  public medSettings: IDropdownSettings = {
    singleSelection: true,
    idField: 'id',
    textField: 'registeration_no',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 3,
    allowSearchFilter: true,
  };

  constructor(
    private fb: FormBuilder,
    private _apiService: ApiService,
    private router: Router,
    private _authService: AuthService,
    private _googleService: GoogleService
  ) {}

  ngOnInit(): void {
    this.getVehicles();
    this.patientData = history.state.patientData;
    this.patientForm.patchValue({
      id: this.patientData.id,
      receipt_no: this.patientData['receipt_no'],
      vehicle: this.patientData['vehicle'],
      fuel_in_litre: this.patientData['fuel_in_litre'],
      rate: this.patientData['rate'],
      amount: this.patientData['amount'],
      amount_paid: this.patientData['amount_paid'],
      transaction_type: this.patientData['transaction_type'],
      present_km: this.patientData['present_km'],
      // refill_in: this.patientData['refill_in']
    });
  }

  getVehicles() {
    this.showSpinner = true;
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
  onItemSelect(item: any) {
    // this.handleMedicalSelect(item);
    console.log(item);
    let selectedVehicle = this.vehicleData.find((vehicle: any) => vehicle.id === item.id);
    if(selectedVehicle) {
      this.patientForm.patchValue({
        present_km: selectedVehicle.present_km
      })
    }
  }
  onSelectAll(items: any) {}

  onSubmit(): void {
    if (this.patientForm.valid) {
      const jsonObject: { [key: string]: any } = {};

      // Extract the form values
      const formModel: PatientModel = this.patientForm.value as PatientModel;

      // Add the 'type' property
      jsonObject['type'] = '5';

      // Loop through the formModel keys and populate the JSON object
      for (const key of Object.keys(formModel)) {
        if (key === 'vehicle') {
          // Assume vehicle is an array with at least one element
          jsonObject[key] = formModel[key][0].id;
        } else {
          // Add other values directly
          jsonObject[key] = formModel[key];
        }
      }
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
              else this.router.navigate(['/fuels']);
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
      this.router.navigate(['fuels'], {
        state: { patientData: this.patientData },
      });
  }
  public navigateBack() {
    if (this.fromPopup) this.formSubmitted.emit();
    else this.router.navigate(['/fuels']);
  }
  closeDialog() {
    this.formSubmitted.emit();
  }
  public calculateAmount () {
    let litre = this.patientForm.get("fuel_in_litre")?.value;
    let rate = this.patientForm.get("rate")?.value;

    if(rate && litre) {
      this.patientForm.patchValue({
        amount: (parseInt(litre) * parseInt(rate)).toString()
      })
    }
  }
}
