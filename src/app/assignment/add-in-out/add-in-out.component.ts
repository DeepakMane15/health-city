import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { APIConstant } from 'src/app/common/constants/APIConstant';
import { ApiService } from 'src/app/shared/services/api/api.service';

@Component({
  selector: 'app-add-in-out',
  templateUrl: './add-in-out.component.html',
  styleUrl: './add-in-out.component.scss'
})
export class AddInOutComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private _apiService: ApiService,
    public dialogRef: MatDialogRef<AddInOutComponent>
  ) {}
  public vehicleData!:any;

  ngOnInit() {
    this.getVehicles();
  }
  public medSettings: IDropdownSettings = {
      singleSelection: true,
      idField: 'id',
      textField: 'registeration_no',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true,
    };


  resetForm = this.fb.group({
    vehicle: ['', Validators.required],
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

  getVehicles() {
    const fd = new FormData();
    fd.append('type','2');
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

  closeDialog() {
    this.dialogRef.close();
  }

  onItemSelect(item: any) {
    // this.handleMedicalSelect(item);
  }
  onSelectAll(items: any) {}

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
