import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { APIConstant } from 'src/app/common/constants/APIConstant';
import { AppConstants } from 'src/app/common/constants/AppConstants';
import { FileType } from 'src/app/common/constants/AppEnum';
import { ApiService } from 'src/app/shared/services/api/api.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-add-job-opening',
  templateUrl: './add-job-opening.component.html',
  styleUrl: './add-job-opening.component.scss',
})
export class AddJobOpeningComponent {
  public showSpinner: Boolean = false;
  public isUnameAvailable: Boolean = true;
  public isChecking: Boolean = false;
  public timezones: any;
  public addressPredictions: any;
  public jobData!: any;
  public fieldData: any;
  public fileType = FileType;
  public photoError!: string;
  public licenceError!: string;
  public resumeError!: string;
  public fileError: boolean = false;

  jobPortalForm = this.fb.group({
    id: 0,
    customer_id: 0,
    title: ['', Validators.required],
    description: '',
    language: [[], Validators.required],
    county: [[], Validators.required],
    profession: [[], Validators.required],
    service_area: [[], Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private _apiService: ApiService,
    private router: Router,
    private _authService: AuthService
  ) {}

  ngOnInit(): void {
    this.jobData = history.state.jobData;
    if (this.jobData)
      this.jobPortalForm.patchValue({
        id: this.jobData.id,
        customer_id: this.jobData.customer_id,
        title: this.jobData.title,
        description: this.jobData.description,
        // profession: this.jobData.profession,
        // language: this.jobData.language?.split(','),
        // county: this.jobData.county?.split(','),
        // service_area: this.jobData?.service_area.split(','),
      });
    this.getFieldData();
  }

  public getFieldData() {
    this.showSpinner = true;
    this._apiService.get(APIConstant.GET_MEDICAL_FIELD_DATA).subscribe(
      (res: any) => {
        if (res) {
          this.fieldData = res;
        }
        this.showSpinner = false;
      },
      (error) => {
        console.log(error);
        this.showSpinner = false;
      }
    );
  }

  onSubmit(): void {
    if (this.jobPortalForm.valid) {
      const formModel: any = this.jobPortalForm.value;
      const formData = new FormData();

      // Convert JSON object to FormData
      for (const key of Object.keys(formModel)) {
        const value = formModel[key];
        formData.append(key, value);
      }
      this.showSpinner = true;
      this._apiService
        .post(
          this.jobData
            ? APIConstant.EDIT_JOB_PORTAL
            : APIConstant.ADD_JOB_PORTAL,
          formData
        )
        .subscribe(
          (res: any) => {
            if (res && res.status) {
              this.showSpinner = false;
              this.router.navigate(['job-portal']);
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
    this.router.navigate(['job-portal'], {
      state: { jobData: this.jobData },
    });
  }
  public navigateBack() {
    this.router.navigate(['/job-portal']);
  }

  public usernameAvailabilityValidator(control: any) {
    if (this.isUnameAvailable === false) {
      return { notAvailable: true };
    }
    return null;
  }

  // public onFileSelected(event: any, type: FileType) {
  //   const file: File = event.target.files[0];
  //   const fileSizeInMB = file.size / (1024 * 1024);
  //   if (type === FileType.LICENCE) {
  //     if (file && file.type === 'application/pdf') {
  //       if (fileSizeInMB > AppConstants.MAX_PDF_SIZE) {
  //         this.setErrorMsg(type, 'size');
  //         return;
  //       }
  //       this.jobPortalForm.get('instruction')?.patchValue(file);
  //       this.removeErrorMsg(type);
  //     } else {
  //       this.setErrorMsg(type, 'type');
  //     }
  //   }
  // }
  // private setErrorMsg(fileType: FileType, errorType: string): void {
  //   if (errorType == 'size') {
  //     if (fileType === FileType.LICENCE) {
  //       this.licenceError = AppConstants.SIZE_ERROR_MSG;
  //     } else {
  //       this.photoError = AppConstants.SIZE_ERROR_MSG;
  //     }
  //   } else if ((errorType = 'type')) {
  //     if (fileType === FileType.LICENCE) {
  //       this.licenceError = AppConstants.PDF_TYPE_ERROR_MSG;
  //     } else {
  //       this.resumeError = AppConstants.PDF_TYPE_ERROR_MSG;
  //     }
  //   }
  // }

  // private removeErrorMsg(fileType: FileType): void {
  //   switch (fileType) {
  //     case FileType.LICENCE: {
  //       this.licenceError = '';
  //       break;
  //     }
  //     case FileType.PHOTO: {
  //       this.photoError = '';
  //       break;
  //     }
  //     case FileType.RESUME: {
  //       this.resumeError = '';
  //       break;
  //     }
  //     default:
  //       break;
  //   }
  // }
}
