// import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { APIConstant } from 'src/app/common/constants/APIConstant';
import { ApiService } from 'src/app/shared/services/api/api.service';
import {
  NgxMatDatetimePickerModule,
  NgxMatTimepickerModule,
} from '@angular-material-components/datetime-picker';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-add-in-out',
  templateUrl: './add-in-out.component.html',
  styleUrl: './add-in-out.component.scss',
  providers: [DatePipe, provideNativeDateAdapter()],
  // providers: [DatePipe]
})
export class AddInOutComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private _apiService: ApiService,
    private datePipe: DatePipe,
    public dialogRef: MatDialogRef<AddInOutComponent>, // private datePipe: DatePipe
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  public vehicleData!: any;
  public driverData!: any;
  public requestData!: any;
  public vehicleDetail!: any;
  public showSpinner: boolean = false;

  ngOnInit() {
    this.getVehicles();
    this.getDrivers();
    this.getrequests();
    this.vehicleDetail = this.data;
  }
  public medSettings: IDropdownSettings = {
    singleSelection: true,
    idField: 'id',
    textField: 'registeration_no',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 1,
    allowSearchFilter: true,
    closeDropDownOnSelection: true,
  };
  public driverSettings: IDropdownSettings = {
    singleSelection: true,
    idField: 'id',
    textField: 'full_name',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 3,
    allowSearchFilter: true,
    closeDropDownOnSelection: true,
  };
  public reqSettings: IDropdownSettings = {
    singleSelection: true,
    idField: 'id',
    textField: 'name',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 3,
    allowSearchFilter: true,
    closeDropDownOnSelection: true,
  };

  resetForm = this.fb.group({
    vehicle: ['', Validators.required],
    driver: ['', Validators.required],
    // date: [new Date(), Validators.required],
    // type: '',
    km: ['', Validators.required],
    // time: ['', Validators.required],
    request: ['', Validators.required],
  });

  public hide1: boolean = true;
  public hide2: boolean = true;
  public currentTime = this.datePipe.transform(
    new Date(),
    'dd-MM-yyyy hh:mm a'
  );

  passwordMatchValidator(
    control: AbstractControl
  ): { [key: string]: boolean } | null {
    const passwordControl = control.parent?.get('password');
    const confirmPasswordControl = control;

    // Check if both controls exist and if their values match
    if (
      passwordControl &&
      confirmPasswordControl &&
      passwordControl.value !== confirmPasswordControl.value
    ) {
      // Return an error if the passwords don't match
      return { passwordMismatch: true };
    }

    // Return null if validation passes
    return null;
  }

  getVehicles() {
    this.showSpinner = true;
    let fd = { type: '2' };
    this._apiService.post(APIConstant.SNM_GET, fd).subscribe(
      (res: any) => {
        if (res && res.status) {
          this.vehicleData = res.data;
          if (this.data)
            this.resetForm.patchValue({
              vehicle: this.vehicleData.filter(
                (vehicle: any) => vehicle.id === this.data.vehicle_id
              ),
              km: this.data.km,
            });
        }
        this.showSpinner = false;
      },
      (error) => {
        this.showSpinner = false;
      }
    );
  }
  getDrivers() {
    let fd = { type: '1' };
    this._apiService.post(APIConstant.SNM_GET, fd).subscribe(
      (res: any) => {
        if (res && res.status) {
          this.driverData = res.data;
          if (this.data)
            this.resetForm.patchValue({
              driver: this.driverData.filter(
                (driver: any) => driver.id === this.data.driver_id
              ),
            });
        }
      },
      (error) => {}
    );
  }
  getrequests() {
    // const fd = new FormData();
    // fd.append('type', '6');
    let fd = { type: '6' };
    this._apiService.post(APIConstant.SNM_GET, fd).subscribe(
      (res: any) => {
        if (res && res.status) {
          this.requestData = res.data;
          this.requestData.push({ id: '0', name: 'Others' });
          if (this.data)
            this.resetForm.patchValue({
              request: this.requestData.filter(
                (request: any) => request.id === this.data.request
              ),
            });
        }
        // this.showSpinner = false;
      },
      (error) => {
        // this.showSpinner = false;
      }
    );
  }

  closeDialog() {
    this.dialogRef.close();
  }

  onItemSelect(item: any) {
    // this.handleMedicalSelect(item);
    // const fd = new FormData();
    // fd.append('type', '8');
    // fd.append('vehicle', item.id);
    console.log(item);
    let selectedVehicle = this.vehicleData.find((v: any) => v.id === item.id);
    console.log(selectedVehicle);
    let fd = { type: '2', vehicle: item.id };
    this._apiService.post(APIConstant.SNM_GET_BY_ID, fd).subscribe(
      (res: any) => {
        this.vehicleDetail = res.data;
        // if (selectedVehicle) {
          this.resetForm.patchValue({
            km: res.data.present_km,
          });
        // }
      },
      (error) => {
        console.error('Operation failed', error);
      }
    );
  }
  onSelectAll(items: any) {}

  public onSubmit() {
    if (this.resetForm.valid && !this.isKmError()) {
      const formModel: any = this.resetForm.value;
      const jsonObject: { [key: string]: any } = {};
      // Set the 'markType' property
      jsonObject['markType'] =
        this.vehicleDetail?.type === 'Out' ? 'In' : 'Out';

      // Populate the JSON object with form data
      for (const key of Object.keys(formModel)) {
        if (key === 'vehicle' || key === 'driver' || key === 'request') {
          jsonObject[key] = formModel[key][0].id;
        } else {
          jsonObject[key] = formModel[key];
        }
      }

      // Add additional property
      jsonObject['type'] = '7';
      this._apiService.post(APIConstant.SNM_SAVE, jsonObject).subscribe(
        (res: any) => {
          this.dialogRef.close(true);
        },
        (error) => {
          this.dialogRef.close(true);
        }
      );
    }
  }
  isKmError(): boolean {
    const kmControl = this.resetForm.get('km');
    return (
      // this.vehicleDetail?.type === 'Out' &&
      kmControl?.value !== null &&
      kmControl?.value !== undefined &&
      parseInt(kmControl.value) < parseInt(this.vehicleDetail?.present_km)
    );
  }
}
