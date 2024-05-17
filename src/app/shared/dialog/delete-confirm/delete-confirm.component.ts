import { Component, Inject } from '@angular/core';
import { ApiService } from '../../services/api/api.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-confirm',
  templateUrl: './delete-confirm.component.html',
  styleUrl: './delete-confirm.component.scss'
})
export class DeleteConfirmComponent {

  constructor(
    private _apiService: ApiService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DeleteConfirmComponent>
  ) {}

  handleDelete () {
    this.dialogRef.close(true);
  }

  handleClose() {
    this.dialogRef.close(false);
  }
}
