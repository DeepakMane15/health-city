import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ADD_POPUP_COMPONENT } from 'src/app/common/constants/AppEnum';

@Component({
  selector: 'app-add-form-popup',
  templateUrl: './add-form-popup.component.html',
  styleUrl: './add-form-popup.component.scss'
})
export class AddFormPopupComponent {
  public addPopupComponent = ADD_POPUP_COMPONENT;
  constructor(
    public dialogRef: MatDialogRef<AddFormPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any

  ) {}

  closeDialog() {
    this.dialogRef.close();
  }

}
