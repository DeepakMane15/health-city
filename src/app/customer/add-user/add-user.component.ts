import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatRadioChange } from '@angular/material/radio';
import { Router } from '@angular/router';
import { APIConstant } from 'src/app/common/constants/APIConstant';
import { UserTypes } from 'src/app/common/constants/UserRoleConstant';
import { UserTypeConstant } from 'src/app/common/constants/UserTypeConstant';
import { UserModel } from 'src/app/common/models/UserModel';
import { ApiService } from 'src/app/shared/services/api/api.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
})
export class AddUserComponent implements OnInit {
  public isChecking: Boolean = false;
  public isUnameAvailable: Boolean = true;
  public showSpinner: Boolean = false;
  public userRoles: any = UserTypes;
  public customerData!: any;
  public userData!: any;
  userForm = this.fb.group({
    customer_id: 0,
    username: [
      '',
      [
        Validators.required,
        Validators.email,
        this.usernameAvailabilityValidator.bind(this),
      ],
    ],
    password: ['', Validators.required],
    first_name: ['', Validators.required],
    // middle_name: '',
    last_name: ['', Validators.required],
    user_type: UserTypeConstant.CUSTOMER_USER,
    user_role: [0, Validators.required],
    user_id: 0,
    force_password_change: true,
  });

  constructor(
    private fb: FormBuilder,
    private _apiService: ApiService,
    private _authService: AuthService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.customerData = history.state.customerData;
    this.userData = history.state.userData;
    console.log(this.customerData);
    if (!this.customerData && !this.userData) {
      this.router.navigate(['/driver/view']);
    }
    if (this.userData) {
      this.userForm.patchValue({
        customer_id: this.userData[0].customer_id,
        user_id: this.userData[0].id,
        username: this.userData[0].username,
        first_name: this.userData[0].first_name,
        last_name: this.userData[0].last_name,
        user_type: this.userData[0].user_type,
        user_role: parseInt(this.userData[0].role),
        force_password_change: false,
      });
      this.userForm.get('username')?.disable();
      this.userForm.get('password')?.disable();
    }
  }

  public usernameAvailabilityValidator(control: any) {
    if (this.isUnameAvailable === false) {
      return { notAvailable: true };
    }
    return null;
  }

  public async checkUsernameAvailable(event: Event) {
    if (!this.userForm.get('username')?.hasError('email')) {
      const inputElement = event.target as HTMLInputElement;
      let username = inputElement.value;
      try {
        this.isChecking = true;
        console.log(this.isChecking);
        const isAvailable: boolean =
          await this._authService.checkUsernameAvailable(username);
        this.isUnameAvailable = isAvailable;
        this.userForm.get('username')?.updateValueAndValidity();
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
      this.userForm.patchValue({ password: '' });
    } else {
      this.userForm.patchValue({ password: this.generateRandomPassword() });
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
  onSubmit() {
    if (this.userForm.valid) {
      this.userForm.patchValue({ customer_id: this.customerData?.customer_id || this.userData.customer_id  });
      const formModel: UserModel = this.userForm.value as UserModel;
      const formData = new FormData();

      // Convert JSON object to FormData
      for (const key of Object.keys(formModel)) {
        const value = formModel[key];
        formData.append(key, value);
      }
      this.showSpinner = true;

      this._apiService
        .post(
          this.userData ? APIConstant.EDIT_USER : APIConstant.ADD_USER,
          formData
        )
        .subscribe(
          (res: any) => {
            if (res && res.status) {
              console.log(res.message);
              this.showSpinner = false;
              this.router.navigate(['/driver/view'], {
                state: { customerData: this.customerData, tabIndex: 1 },
              });
            } else {
              this.showSpinner = false;
              console.log(res.message);
            }
          },
          (error) => {
            console.log(error);
            this.showSpinner = false;
          }
        );
    }
  }
  public handleForcePasswordChange(value: any) {
    this.userForm.patchValue({ force_password_change: value });
  }
  public handleCancel() {
    this.router.navigate(['driver/view'], {
      state: { customerData: this.customerData, tabIndex: 1 },
    });
  }
}
