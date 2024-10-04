import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-reset-pwd',
  templateUrl: './reset-pwd.component.html',
  styleUrl: './reset-pwd.component.scss'
})
export class ResetPwdComponent {
  constructor(
    public dialogRef: MatDialogRef<ResetPwdComponent>
  ) {}

  handleDelete () {
    this.dialogRef.close(true);
  }

  handleClose() {
    this.dialogRef.close(false);
  }
}
