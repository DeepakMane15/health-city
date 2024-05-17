import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatRadioChange } from '@angular/material/radio';
import { Router } from '@angular/router';
import { APIConstant } from 'src/app/common/constants/APIConstant';
import { AppConstants } from 'src/app/common/constants/AppConstants';
import { FileType } from 'src/app/common/constants/AppEnum';
import { DriverModel } from 'src/app/common/models/DriverModel';
import { PatientModel } from 'src/app/common/models/PatientModel';
import { ApiService } from 'src/app/shared/services/api/api.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-add-driver',
  templateUrl: './add-driver.component.html',
  styleUrl: './add-driver.component.scss',
})
export class AddDriverComponent {
  public showSpinner: Boolean = false;
  public isUnameAvailable: Boolean = true;
  public isChecking: Boolean = false;
  public timezones: any;
  public addressPredictions: any;
  public driverData!: any;
  public fieldData: any;
  public fileType = FileType;
  public photoError!: string;
  public licenceError!: string;
  public resumeError!: string;
  public fileError: boolean = false;
  @Input() fromPopup: boolean = false;
  @Output() formSubmitted: EventEmitter<void> = new EventEmitter<void>();

  driverForm = this.fb.group({
    id: 0,
    customer_id: 0,
    first_name: ['', Validators.required],
    last_name: ['', Validators.required],
    email: [
      '',
      [
        Validators.required,
        Validators.email,
        this.usernameAvailabilityValidator.bind(this),
      ],
    ],
    password: ['', Validators.required],
    address: ['', Validators.required],
    mobile_no: ['', Validators.required],
    licence: null as File | null,
  });

  constructor(
    private fb: FormBuilder,
    private _apiService: ApiService,
    private router: Router,
    private _authService: AuthService
  ) {}

  ngOnInit(): void {
    this.driverData = history.state.driverData;
    if (this.driverData)
      this.driverForm.patchValue({
        id: this.driverData.id,
        customer_id: this.driverData.customer_id,
        first_name: this.driverData.first_name,
        last_name: this.driverData.last_name,
        email: this.driverData.email,
        password: this.driverData.password,
        address: this.driverData.address,
        mobile_no: this.driverData.mobile_no,
      });
    console.log(this.fromPopup);
  }

  onSubmit(): void {
    if (this.driverForm.valid) {
      const formModel: any = this.driverForm.value;
      const formData = new FormData();

      // Convert JSON object to FormData
      for (const key of Object.keys(formModel)) {
        const value = formModel[key];
        formData.append(key, value);
      }
      this.showSpinner = true;
      this._apiService
        .post(
          this.driverData ? APIConstant.EDIT_DRIVER : APIConstant.ADD_DRIVER,
          formData
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
    if (field === 'phone')
      this.driverForm.patchValue(
        { mobile_no: enteredValue },
        { emitEvent: false }
      );

    this.driverForm.get(field)?.markAsTouched(); // Mark phone as touched
  }

  public handleCancel() {
    if (this.fromPopup) this.formSubmitted.emit();
    else
      this.router.navigate(['driver'], {
        state: { driverData: this.driverData },
      });
  }
  public navigateBack() {
    if (this.fromPopup) this.formSubmitted.emit();
    else this.router.navigate(['/driver']);
  }

  public usernameAvailabilityValidator(control: any) {
    if (this.isUnameAvailable === false) {
      return { notAvailable: true };
    }
    return null;
  }

  public async checkUsernameAvailable(event: Event) {
    if (!this.driverForm.get('email')?.hasError('email')) {
      const inputElement = event.target as HTMLInputElement;
      let email = inputElement.value;
      try {
        this.isChecking = true;
        console.log(this.isChecking);
        const isAvailable: boolean =
          await this._authService.checkUsernameAvailable(email);
        this.isUnameAvailable = isAvailable;
        this.driverForm.get('email')?.updateValueAndValidity();
      } catch (err) {
        console.log(err);
      } finally {
        this.isChecking = false;
        console.log(this.isChecking);
      }
    }
  }

  public handlePasswordCreation(event: MatRadioChange) {
    if (event.value == 1) {
      this.driverForm.patchValue({ password: '' });
    } else {
      this.driverForm.patchValue({ password: this.generateRandomPassword() });
    }
  }

  public generateRandomPassword() {
    const charset =
      'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$&';

    let password = '';
    for (let i = 0; i < 8; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset[randomIndex];
    }
    return password;
  }
  public onFileSelected(event: any, type: FileType) {
    const file: File = event.target.files[0];
    const fileSizeInMB = file.size / (1024 * 1024);
    if (type === FileType.LICENCE) {
      if (file && file.type === 'application/pdf') {
        if (fileSizeInMB > AppConstants.MAX_PDF_SIZE) {
          this.setErrorMsg(type, 'size');
          return;
        }
        this.driverForm.get('licence')?.patchValue(file);
        this.removeErrorMsg(type);
      } else {
        this.setErrorMsg(type, 'type');
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

  closeDialog() {
    this.formSubmitted.emit();
  }
}
