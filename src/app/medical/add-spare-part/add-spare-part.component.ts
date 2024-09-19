import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { APIConstant } from 'src/app/common/constants/APIConstant';
import { AppConstants } from 'src/app/common/constants/AppConstants';
import { FileType } from 'src/app/common/constants/AppEnum';
import { MedicalTeamModel } from 'src/app/common/models/MedicalTeamModel';
import { ApiService } from 'src/app/shared/services/api/api.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-add-spare-part',
  templateUrl: './add-spare-part.component.html',
  styleUrl: './add-spare-part.component.scss',
  providers: [DatePipe],
})
export class AddSparePartComponent implements OnInit {
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
  public vehicleData!: any;
  public driverData!: any;
  medicalForm = this.fb.group({
    id: 0,
    // driver: ['', Validators.required],
    part: ['', Validators.required],
    vehicle: ['', Validators.required],
    desc: ['', Validators.required],
    date: [new Date(), Validators.required],
    amount: ['', Validators.required],
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

  ngOnInit(): void {
    this.getVehicles();
    this.getDrivers();
    this.medicalData = history.state.medicalData;
    if (this.medicalData) {
      console.log(this.medicalData);
      this.medicalForm.patchValue({
        id: this.medicalData['id'],
        // driver: this.medicalData['driver'],
        vehicle: this.medicalData['vehicle'],
        part: this.medicalData['part'],
        date: this.medicalData['date'],
        desc: this.medicalData['desc'],
        amount: this.medicalData['amount'],
      });
    }
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
      }
    );
  }
  getDrivers() {
    this.showSpinner = true;
    // const fd = new FormData();
    // fd.append("type", "1");
    let fd = { type: '1' };
    this._apiService.post(APIConstant.SNM_GET, fd).subscribe(
      (res: any) => {
        if (res && res.status) {
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
      const jsonObject: { [key: string]: any } = {};

      // Extract the form values
      const formModel: MedicalTeamModel = this.medicalForm
        .value as MedicalTeamModel;

      // Add the 'type' property
      jsonObject['type'] = '4';

      // Loop through the formModel keys and populate the JSON object
      for (let key of Object.keys(formModel)) {
        if (key === 'date') {
          // Manually format the date
          const rawDate = this.medicalForm.get('date')?.value;
          if (rawDate) {
            const dateObj = new Date(rawDate);
            const formattedDate = `${dateObj.getFullYear()}-${(dateObj.getMonth() + 1)
              .toString()
              .padStart(2, '0')}-${dateObj.getDate().toString().padStart(2, '0')}`;
            jsonObject[key] = formattedDate;
          } else {
            jsonObject[key] = ''; // Handle null or undefined
          }
        } else if (key === 'vehicle') {
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
          this.medicalData ? APIConstant.SNM_EDIT : APIConstant.SNM_SAVE,
          jsonObject
        )
        .subscribe(
          (res: any) => {
            if (res && res.status) {
              this.showSpinner = false;
              this.router.navigate(['/vehicles/spare-parts']);
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
    this.router.navigate(['/vehicles/spare-parts']);
  }

  public navigateBack() {
    this.router.navigate(['/vehicles/spare-parts']);
  }
}
