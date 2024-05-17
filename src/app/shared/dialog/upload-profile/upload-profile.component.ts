import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../services/api/api.service';
import { MatDialogRef } from '@angular/material/dialog';
import { APIConstant } from 'src/app/common/constants/APIConstant';
import { AppConstants } from 'src/app/common/constants/AppConstants';

@Component({
  selector: 'app-upload-profile',
  templateUrl: './upload-profile.component.html',
  styleUrl: './upload-profile.component.scss'
})
export class UploadProfileComponent {
  constructor(
    private fb: FormBuilder,
    private _apiService: ApiService,
    public dialogRef: MatDialogRef<UploadProfileComponent>
  ) {}

  public photoError!: string;

  profileForm = this.fb.group({
    photo: null as File | null,
  });

  public onFileSelected(event: any) {
    const file: File = event.target.files[0];
    const fileSizeInMB = file.size / (1024 * 1024);
      if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
        if (fileSizeInMB > AppConstants.MAX_JPG_SIZE) {
          this.photoError = AppConstants.SIZE_ERROR_MSG;
          return;
        }
        this.profileForm.get('photo')?.patchValue(file);
        this.photoError = '';
      } else {
        this.photoError = AppConstants.JPG_TYPE_ERROR_MSG;
      }
  }

  public onSubmit() {
    if (this.profileForm.valid ) {
      const fd = new FormData();
      fd.append('photo', this.profileForm.get('photo')?.value || '');
      this._apiService.post(APIConstant.UPLOAD_PROFILE_PICTURE, fd).subscribe(
        (res: any) => {
          alert("Picture updated successfully");
          this.dialogRef.close(res.avatar);
        },
        (error) => {
          this.dialogRef.close();
          console.error('Operation failed', error);
        }
      );
    }
  }
  public closeDialog() {
    this.dialogRef.close();
  }
}
