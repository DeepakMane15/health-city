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
  selector: 'app-add-medical',
  templateUrl: './add-medical.component.html',
  styleUrls: ['./add-medical.component.scss'],
  providers: [DatePipe]
})
export class AddMedicalComponent implements OnInit {
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
  public fuelData!:any;
  medicalForm = this.fb.group({
    id: 0,
    chassis_no: ['', Validators.required],
    registeration_no: ['', Validators.required],
    engine_no: '',
    manufacturing_date: ['', Validators.required],
    sitting_capacity: ['', Validators.required],
    model_name: ['', Validators.required],
    vehicle_make: ['', Validators.required],
    purchase_date: ['', Validators.required],
    registeration_date: ['', Validators.required],
    fuel_type: ['', Validators.required],
    registeration_validity: ['', Validators.required],
    present_km: ['', Validators.required],
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
    this.medicalData = history.state.medicalData;
    if (this.medicalData) {
      console.log(this.medicalData);
      this.medicalForm.patchValue({
        id: this.medicalData['id'],
        chassis_no: this.medicalData['chassis_no'],
        registeration_no: this.medicalData['registeration_no'],
        engine_no: this.medicalData['engine_no'],
        manufacturing_date: this.medicalData['manufacturing_date'],
        sitting_capacity: this.medicalData['sitting_capacity'],
        model_name: this.medicalData['model_name'],
        vehicle_make: this.medicalData['vehicle_make'],
        purchase_date: this.medicalData['purchase_date'],
        registeration_date: this.medicalData['registeration_date'],
        fuel_type: this.medicalData['fuel_type'],
        registeration_validity: this.medicalData['registeration_validity'],
        present_km: this.medicalData['present_km'],
      });
    }
  }

  onItemSelect(item: any) {}
  onSelectAll(items: any) {}

  public onSubmit(): void {

    if (this.medicalForm.valid) {
      const formModel: MedicalTeamModel = this.medicalForm
        .value as MedicalTeamModel;
      const formData = new FormData();
      formData.append("type",'3');

      // Convert JSON object to FormData
      for (let key of Object.keys(formModel)) {
        if(key === 'manufacturing_date') {
          let date = this.datePipe.transform(this.medicalForm.get('manufacturing_date')?.value, 'MM-dd-yyyy');
          formData.append(key, date?.toString() || "");
        }
        else if(key === 'registeration_date') {
          let date = this.datePipe.transform(this.medicalForm.get('registeration_date')?.value, 'MM-dd-yyyy');
          formData.append(key, date?.toString() || "");
        }
        else if(key === 'purchase_date') {
          let date = this.datePipe.transform(this.medicalForm.get('purchase_date')?.value, 'MM-dd-yyyy');
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
              this.router.navigate(['/spare-parts']);
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
    this.router.navigate(['spare-parts']);
  }

  public navigateBack() {
    this.router.navigate(['/spare-parts']);
  }
}
