import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { Router } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { APIConstant } from 'src/app/common/constants/APIConstant';
import { AppConstants } from 'src/app/common/constants/AppConstants';
import { FileType } from 'src/app/common/constants/AppEnum';
import { MedicalTeamModel } from 'src/app/common/models/MedicalTeamModel';
import { ApiService } from 'src/app/shared/services/api/api.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-add-pollution',
  templateUrl: './add-pollution.component.html',
  styleUrl: './add-pollution.component.scss',
  providers:[DatePipe]
})
export class AddPollutionComponent implements OnInit {
  public showSpinner: Boolean = false;
  public medicalData: any;
  public isUnameAvailable: Boolean = true;
  public isChecking: Boolean = false;
  public fieldData: any;
  public fileType = FileType;
  public photoError!: string;
  public licenceError!: string;
  public resumeError!: string;
  public fileError: boolean = false;
  public prof: any;
  public vehicleData!:any;
  public driverData!:any;
  medicalForm = this.fb.group({
    id: 0,
    addType: ['Pollution', Validators.required],
    amount: ['', Validators.required],
    vehicle: ['', Validators.required],
    tenure: ['', Validators.required],
    date: [new Date(), Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    private _apiService: ApiService,
    private router: Router,
    private _authService: AuthService,
    private datePipe: DatePipe
  ) {}

  public lngSettings!: IDropdownSettings;
  public countySettings!: IDropdownSettings;
  public servSettings!: IDropdownSettings;
  public profSettings!: IDropdownSettings;
  public ethSettings!: IDropdownSettings;

  ngOnInit(): void {
    this.getVehicles();
    this.getDrivers();
    this.medicalData = history.state.medicalData;
    if (this.medicalData) {
      console.log(this.medicalData);
      this.medicalForm.patchValue({
        id: this.medicalData['id'],
        addType: this.medicalData['type'],
        vehicle: this.medicalData['vehicle'],
        amount: this.medicalData['amount'],
        date: this.medicalData['valid_till'],
        tenure: this.medicalData['tenure'],
      });
    }
  }

  getVehicles() {
    this.showSpinner = true;
    const fd = new FormData();
    fd.append("type", "2");
    this._apiService
      .post(APIConstant.SNM_GET,
        fd
      )
      .subscribe(
        (res: any) => {
          if(res && res.status) {
            this.vehicleData = res.data;
            this.showSpinner = false;
          }
        },
        (error) => {
          this.showSpinner = false;
        }
      );

  }
  getDrivers() {
    this.showSpinner = true;
    const fd = new FormData();
    fd.append("type", "1");
    this._apiService
      .post(APIConstant.SNM_GET,
        fd
      )
      .subscribe(
        (res: any) => {
          if(res && res.status) {
            this.driverData = res.data;
            this.showSpinner = false;
          }
        },
        (error) => {
          this.showSpinner = false;
        }
      );
  }

  onItemSelect(item: any) {}
  onSelectAll(items: any) {}

  public onSubmit(): void {

    if (this.medicalForm.valid) {
      const formModel: MedicalTeamModel = this.medicalForm
        .value as MedicalTeamModel;
      const formData = new FormData();
      formData.append("type",'8');

      // Convert JSON object to FormData
      for (let key of Object.keys(formModel)) {
        if(key === 'date') {
          let date = this.datePipe.transform(this.medicalForm.get('date')?.value, 'MM-dd-yyyy');
          formData.append(key, date?.toString() || "");
        }
        else {
          const value = formModel[key];
          formData.append(key, value);
        }
      }
      this.showSpinner = true;
      this._apiService
        .post(
          this.medicalData ? APIConstant.SNM_EDIT : APIConstant.SNM_SAVE,
          formData
        )
        .subscribe(
          (res: any) => {
            if (res && res.status) {
              this.showSpinner = false;
              this.router.navigate(['/medical-team/pollution']);
            } else {
              this.showSpinner = false;
            }
          },
          (error) => {
            this.showSpinner = false;
            console.error('Operation failed', error);
          }
        );
    }
    return;
  }

  public handleCancel() {
    this.router.navigate(['/medical-team/pollution']);
  }

  public navigateBack() {
    this.router.navigate(['/medical-team/pollution']);
  }
}

