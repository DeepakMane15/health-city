import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { map } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ChatService } from 'src/app/shared/services/chat/chat.service';

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrl: './chat-window.component.scss',
})
export class ChatWindowComponent implements OnInit {
  @Input() group: any;
  @Input() userId: any;
  public messages: any;
  public message!: string;
  public userProfile!: any;
  constructor(private _chatService: ChatService, private authService: AuthService) {}
  ngOnInit() {
    this.userProfile = this.authService.getUserData();
    // alert(this.userProfile.id)
    console.log(this.userProfile)
  }

  ngOnChanges(changes: SimpleChanges) {
    if ('group' in changes && this.group) {
      this.fetchMessages();
    }
  }

  fetchMessages(): void {
    this._chatService
      .getAllMessages(this.group, this.userId)
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
        console.log("messages : ", data);
        this.messages = data;
      });
  }


}
