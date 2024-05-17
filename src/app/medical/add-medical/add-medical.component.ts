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
  medicalForm = this.fb.group({
    customer_id: 0,
    pid: 0,
    first_name: ['', Validators.required],
    last_name: ['', Validators.required],
    describe: '',
    email: [
      '',
      [
        Validators.required,
        Validators.email,
        this.usernameAvailabilityValidator.bind(this),
      ],
    ],
    profession: [[], Validators.required],
    ethnicity: [[], Validators.required],
    languages: [[], Validators.required],
    county: [[], Validators.required],
    service_area: [[], Validators.required],
    phone: ['', Validators.required],
    address: ['', Validators.required],
    photo: null as File | null,
    licence: null as File | null,
    resume: null as File | null,
    internal_notes: '',
  });

  constructor(
    private fb: FormBuilder,
    private _apiService: ApiService,
    private router: Router,
    private _authService: AuthService
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
        customer_id: this.medicalData.customer_id,
        pid: this.medicalData.pid,
        first_name: this.medicalData.first_name,
        last_name: this.medicalData.last_name,
        describe: this.medicalData.discibe,
        email: this.medicalData.email,
        // profession: this.medicalData.profession,
        // ethnicity: this.medicalData.ethnicity,
        // languages: this.medicalData.languages?.split(','),
        // county: this.medicalData.region?.split(','),
        // service_area: this.medicalData.service_area?.split(','),
        phone: this.medicalData.phone_no,
        address: this.medicalData.address,
        internal_notes: this.medicalData.internal_notes || '',
      });
    }
    this.getFieldData();

    this.lngSettings = {
      singleSelection: false,
      idField: 'lid',
      textField: 'title',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true,
    };
    this.countySettings = {
      singleSelection: false,
      idField: 'rid',
      textField: 'title',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true,
    };
    this.servSettings = {
      singleSelection: false,
      idField: 'said',
      textField: 'service_area_title',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true,
    };
    this.profSettings = {
      singleSelection: true,
      idField: 'prid',
      textField: 'title',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true,
    };
    this.ethSettings = {
      singleSelection: true,
      idField: 'eid',
      textField: 'title',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true,
    };
  }

  onItemSelect(item: any) {}
  onSelectAll(items: any) {}

  public onSubmit(): void {
    if (this.medicalForm.valid) {
      if (
        !this.medicalData &&
        (!this.medicalForm.get('photo')?.value ||
          !this.medicalForm.get('resume')?.value ||
          !this.medicalForm.get('licence')?.value)
      ) {
        this.fileError = true;
        return;
      }
      this.fileError = false;
      const formModel: MedicalTeamModel = this.medicalForm
        .value as MedicalTeamModel;
      const formData = new FormData();

      // Convert JSON object to FormData
      for (let key of Object.keys(formModel)) {
        let newKey;

        if (
          key !== 'profession' &&
          key !== 'ethnicity' &&
          key !== 'languages' &&
          key !== 'county' &&
          key !== 'service_area'
        ) {
          if (key == 'first_name') newKey = 'fname';
          else if (key == 'last_name') newKey = 'lname';
          else if (key == 'describe') newKey = 'discibe';
          else if (key == 'internal_notes') newKey = 'internalNotes';
          // else if (key == 'county') newKey = 'country';
          // else if (key == 'service_area') newKey = 'serviceArea';

          const value = formModel[key];
          formData.append(newKey || key, value);
        }
      }
      let prod = this.medicalForm.get('profession')?.value;
      console.log(this.medicalForm.value);
      formData.append(
        'profession',
        (this.medicalForm.get('profession')?.value || [])
          .map((item: any) => item.prid)
          .join(',')
      );
      formData.append(
        'ethnicity',
        (this.medicalForm.get('ethnicity')?.value || [])
          .map((item: any) => item.eid)
          .join(',')
      );
      formData.append(
        'languages',
        (this.medicalForm.get('languages')?.value || [])
          .map((item: any) => item.lid)
          .join(',')
      );
      formData.append(
        'country',
        (this.medicalForm.get('county')?.value || [])
          .map((item: any) => item.rid)
          .join(',')
      );
      formData.append(
        'serviceArea',
        (this.medicalForm.get('service_area')?.value || [])
          .map((item: any) => item.said)
          .join(',')
      );

      this.showSpinner = true;
      this._apiService
        .post(
          this.medicalData
            ? APIConstant.EDIT_MEDICALTEAM
            : APIConstant.ADD_MEDICALTEAM,
          formData
        )
        .subscribe(
          (res: any) => {
            if (res && res.status) {
              this.showSpinner = false;
              this.router.navigate(['/medical-team']);
            } else {
              this.showSpinner = false;
            }
          },
          (error) => {
            this.showSpinner = false;
            console.error('Operation failed', error);
          }
        );
    } else {
      if (
        !this.medicalData &&
        (!this.medicalForm.get('photo')?.value ||
          !this.medicalForm.get('resume')?.value ||
          !this.medicalForm.get('licence')?.value)
      ) {
        this.fileError = true;
        return;
      }
    }
    return;
  }

  public getFieldData() {
    this.showSpinner = true;
    this._apiService.get(APIConstant.GET_MEDICAL_FIELD_DATA).subscribe(
      (res: any) => {
        if (res) {
          console.log(res);
          this.fieldData = res;

          // Set the pre-selected items to the form control
          if (this.medicalData) {
            this.medicalForm.patchValue({
              service_area: this.fieldData.serviceArea.filter((item: any) =>
                this.medicalData.service_area.split(',').includes(item.said)
              ),
              languages: this.fieldData?.languages.filter((s: any) =>
                this.medicalData.languages.split(',').includes(s.lid)
              ),
              ethnicity: this.fieldData?.ethnicity.filter(
                (s: any) => this.medicalData.ethnicity === s.eid
              ),
              profession: this.fieldData?.profession.filter(
                (s: any) => this.medicalData.profession === s.prid
              ),
              county: this.fieldData?.region.filter((s: any) =>
                this.medicalData.region.split(',').includes(s.rid)
              ),
            });
          }
        }
        this.showSpinner = false;
      },
      (error) => {
        console.log(error);
        this.showSpinner = false;
      }
    );
  }

  public usernameAvailabilityValidator(control: any) {
    if (this.isUnameAvailable === false) {
      return { notAvailable: true };
    }
    return null;
  }

  public handleCancel() {
    this.router.navigate(['medical-team']);
  }

  public async checkUsernameAvailable(event: Event) {
    if (!this.medicalForm.get('email')?.hasError('email')) {
      const inputElement = event.target as HTMLInputElement;
      let username = inputElement.value;
      try {
        this.isChecking = true;
        console.log(this.isChecking);
        const isAvailable: boolean =
          await this._authService.checkUsernameAvailable(username);
        this.isUnameAvailable = isAvailable;
        this.medicalForm.get('email')?.updateValueAndValidity();
      } catch (err) {
        console.log(err);
      } finally {
        this.isChecking = false;
        console.log(this.isChecking);
      }
    }
  }

  public onFileSelected(event: any, type: FileType) {
    const file: File = event.target.files[0];
    const fileSizeInMB = file.size / (1024 * 1024);
    if (type === FileType.LICENCE || type === FileType.RESUME) {
      if (file && file.type === 'application/pdf') {
        if (fileSizeInMB > AppConstants.MAX_PDF_SIZE) {
          this.setErrorMsg(type, 'size');
          return;
        }
        this.medicalForm
          .get(type === FileType.LICENCE ? 'licence' : 'resume')
          ?.patchValue(file);
        this.removeErrorMsg(type);
      } else {
        this.setErrorMsg(type, 'type');
      }
    } else {
      if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
        if (fileSizeInMB > AppConstants.MAX_JPG_SIZE) {
          this.photoError = AppConstants.SIZE_ERROR_MSG;
          return;
        }
        this.medicalForm.get('photo')?.patchValue(file);
        this.removeErrorMsg(type);
      } else {
        this.photoError = AppConstants.JPG_TYPE_ERROR_MSG;
      }
    }
  }

  private setErrorMsg(fileType: FileType, errorType: string): void {
    if (errorType == 'size') {
      if (fileType === FileType.LICENCE) {
        this.licenceError = AppConstants.SIZE_ERROR_MSG;
      } else {
        this.photoError = AppConstants.SIZE_ERROR_MSG;
      }
    } else if ((errorType = 'type')) {
      if (fileType === FileType.LICENCE) {
        this.licenceError = AppConstants.PDF_TYPE_ERROR_MSG;
      } else {
        this.resumeError = AppConstants.PDF_TYPE_ERROR_MSG;
      }
    }
  }

  private removeErrorMsg(fileType: FileType): void {
    switch (fileType) {
      case FileType.LICENCE: {
        this.licenceError = '';
        break;
      }
      case FileType.PHOTO: {
        this.photoError = '';
        break;
      }
      case FileType.RESUME: {
        this.resumeError = '';
        break;
      }
      default:
        break;
    }
  }
  public navigateBack() {
    this.router.navigate(['/medical-team']);
  }
}
