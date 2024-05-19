// import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDialogRef } from '@angular/material/dialog';
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
    public dialogRef: MatDialogRef<AddInOutComponent> // private datePipe: DatePipe
  ) {}
  public vehicleData!: any;
  public driverData!: any;
  public requestData!: any;
  public vehicleDetail!: any;

  ngOnInit() {
    this.getVehicles();
    this.getDrivers();
    this.getrequests();
  }
  public medSettings: IDropdownSettings = {
    singleSelection: true,
    idField: 'id',
    textField: 'registeration_no',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 1,
    allowSearchFilter: true,
    closeDropDownOnSelection: true
  };
  public driverSettings: IDropdownSettings = {
    singleSelection: true,
    idField: 'id',
    textField: 'full_name',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 3,
    allowSearchFilter: true,
    closeDropDownOnSelection: true
  };
  public reqSettings: IDropdownSettings = {
    singleSelection: true,
    idField: 'id',
    textField: 'name',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 3,
    allowSearchFilter: true,
    closeDropDownOnSelection: true
  };

  resetForm = this.fb.group({
    vehicle: ['', Validators.required],
    driver: ['', Validators.required],
    date: ['', Validators.required],
    type: '',
    km: ['', Validators.required],
    time: ['', Validators.required],
    request:  ['', Validators.required]
  });

  public hide1: boolean = true;
  public hide2: boolean = true;

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
    const fd = new FormData();
    fd.append('type', '2');
    this._apiService.post(APIConstant.SNM_GET, fd).subscribe(
      (res: any) => {
        if (res && res.status) {
          this.vehicleData = res.data;
        }
        // this.showSpinner = false;
      },
      (error) => {
        // this.showSpinner = false;
      }
    );
  }
  getDrivers() {
    const fd = new FormData();
    fd.append('type', '1');
    this._apiService.post(APIConstant.SNM_GET, fd).subscribe(
      (res: any) => {
        if (res && res.status) {
          this.driverData = res.data;
        }
      },
      (error) => {}
    );
  }
  getrequests() {
    const fd = new FormData();
    fd.append('type', '6');
    this._apiService.post(APIConstant.SNM_GET, fd).subscribe(
      (res: any) => {
        if (res && res.status) {
          this.requestData = res.data;
        }
        // this.showSpinner = false;
      },
      (error) => {
        // this.showSpinner = false;
      }
    );
  }

  getVehicleInOutData() {}

  closeDialog() {
    this.dialogRef.close();
  }

  onItemSelect(item: any) {
    // this.handleMedicalSelect(item);
    const fd = new FormData();
    fd.append('type', '8');
    fd.append('vehicle', item.id);
    this._apiService.post(APIConstant.SNM_GET, fd).subscribe(
      (res: any) => {
        this.vehicleDetail = res.data[0];
      },
      (error) => {
        console.error('Operation failed', error);
      }
    );
  }
  onSelectAll(items: any) {}

  public onSubmit() {
    if (this.resetForm.valid) {
      const formModel: any = this.resetForm.value;
      const formData = new FormData();
      formData.append(
        'markType',
        this.vehicleDetail?.type === 'Out' ? 'In' : 'Out'
      );

      // Convert JSON object to FormData
      for (const key of Object.keys(formModel)) {
        if (key === 'vehicle' || key === 'driver' || key === 'request') {
          formData.append(key, formModel[key][0].id);
        } else if (key === 'date') {
          let date = this.datePipe.transform(
            this.resetForm.get('date')?.value,
            'MM-dd-yyyy'
          );
          formData.append(key, date?.toString() || '');
        } else {
          const value = formModel[key];
          formData.append(key, value);
        }
      }
      formData.append("type",'7');
      this._apiService.post(APIConstant.SNM_SAVE, formData).subscribe(
        (res: any) => {
          this.dialogRef.close(true);
        },
        (error) => {
          this.dialogRef.close(true);
        }
      );
    }
  }
}
