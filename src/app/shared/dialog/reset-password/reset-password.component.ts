import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ApiService } from '../../services/api/api.service';
import { APIConstant } from 'src/app/common/constants/APIConstant';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss',
})
export class ResetPasswordComponent {
  constructor(
    private fb: FormBuilder,
    private _apiService: ApiService,
    public dialogRef: MatDialogRef<ResetPasswordComponent>
  ) {}

  resetForm = this.fb.group({
    password: ['', Validators.required],
    confirmPassword: [
      '',
      [Validators.required, this.passwordMatchValidator.bind(this)],
    ],
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

  closeDialog() {
    this.dialogRef.close();
  }

  public onSubmit() {
    if (
      this.resetForm.valid &&
      this.resetForm.get('password')?.value ===
        this.resetForm.get('confirmPassword')?.value
    ) {
      const fd = new FormData();
      fd.append('new_password', this.resetForm.get('password')?.value || '');
      this._apiService.post(APIConstant.RESET_PASSWORD, fd).subscribe(
        (res: any) => {
          alert('Password updated successfully');
          this.dialogRef.close();
        },
        (error) => {
          this.dialogRef.close();
          console.error('Operation failed', error);
        }
      );
    }
  }
}
