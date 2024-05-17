import { Component, OnInit, SimpleChanges, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { ChatService } from 'src/app/shared/services/chat/chat.service';
import { ApiService } from 'src/app/shared/services/api/api.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateGroupModalComponent } from 'src/app/new-chat/create-group-modal/create-group-modal.component';
import { APIConstant } from 'src/app/common/constants/APIConstant';
import { AppConstants } from 'src/app/common/constants/AppConstants';

@Component({
  selector: 'app-chat-main',
  templateUrl: './chat-main.component.html',
  styleUrl: './chat-main.component.scss',
})
export class ChatMainComponent implements OnInit {
  public groups: any = [];
  public selectedGroup!: any;
  public showSpinner: boolean = false;
  public userProfile: any;
  public message: string = "";
  public messages: any = [];
  public default_img = AppConstants.DEFAULT_IMG;
  public searchValue!: string;

  constructor(
    private _chatService: ChatService,
    private _apiServices: ApiService,
    private _authService: AuthService,
    public dialog: MatDialog
  ) {}
  ngOnInit() {
    this.userProfile = this._authService.getUserData();
    // alert(this.userProfile.id)
    this.fetGroups();
    this.getParticipants();
  }
  private breakpointObserver = inject(BreakpointObserver);

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  fetGroups(): void {
    this._chatService
      .getAll(this.userProfile.id)
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c) => ({
            id: c.payload.doc.id,
            ...c.payload.doc.data(),
          }))
        )
      )
      .subscribe((data) => {
        this.groups.push(...data);
        console.log(this.groups);
      });
  }

  getGroup(newItem: any) {
    this.selectedGroup = newItem;
  }

  getParticipants() {
    this.showSpinner = true;
    this._apiServices.get(APIConstant.GET_PARTICIPANTS).subscribe(
      (res: any) => {
        if (res && res.status) {
          this.showSpinner = false;
          this.groups.push(...res.data);
          console.log(this.groups);
        } else {
          this.showSpinner = false;
        }
      },
      (error) => {
        this.showSpinner = false;
      }
    );
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
      this.groups = [];
      this.fetGroups();
      this.getParticipants();
    });
  }

  public sendMessage() {
    if (this.message != '') {
      let msgObj = {
        senderId: this.userProfile.id,
        message: this.message,
        participants:
          this.selectedGroup.type === 'group'
            ? this.selectedGroup.members
            : [this.userProfile.id, this.selectedGroup.id],
        groupId:
          this.selectedGroup.type === 'group' ? this.selectedGroup.id : null,
        type: this.selectedGroup.type === 'group' ? 'group' : 'individual',
        timestamp: new Date(),
      };
      console.log(msgObj);
      this._chatService.sendMessage(msgObj);
      this.message = '';
    }
  }

  // ngOnChanges(changes: SimpleChanges) {
  //   if ('group' in changes && this.selectedGroup) {
  //     this.fetchMessages();
  //   }
  // }

  fetchMessages(): void {
    this._chatService
      .getAllMessages(this.selectedGroup, this.userProfile.id)
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c) => ({
            id: c.payload.doc.id,
            ...c.payload.doc.data(),
          }))
        )
      )
      .subscribe((data) => {
        console.log('messages : ', data);
        this.messages = data;
      });
  }
  handleChatSelect(group: any) {
    this.selectedGroup = group;
    this.fetchMessages();
  }
}
