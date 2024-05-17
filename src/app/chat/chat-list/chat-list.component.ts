import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CreateGroupModalComponent } from '../create-group-modal/create-group-modal.component';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrl: './chat-list.component.scss'
})
export class ChatListComponent implements OnInit{
  public chatList: any
  @Input() groups: any;
  @Output() newItemEvent = new EventEmitter<string>();

  constructor(
    private _authService: AuthService,
    public dialog: MatDialog,
  ) {

  }

  ngOnInit(): void {

  }
  selectGroup(value: any) {
    this.newItemEvent.emit(value);
  }
  public createGroup(): void {
    const userProfile = this._authService.getUserData();
    const dialogRef = this.dialog.open(CreateGroupModalComponent, {
      data: this.groups,
      width: '600px', // Set width to 600 pixels
      autoFocus: false,
      // height: '800px', // Set height to 400 pixels
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result)
    });
  }
}
