import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-chat-messages',
  templateUrl: './chat-messages.component.html',
  styleUrl: './chat-messages.component.scss'
})
export class ChatMessagesComponent implements OnInit {
  @Input() messages: any;
  public userProfile!:any;

  constructor(
    private authService: AuthService
  )
  {}
  ngOnInit() {
    this.userProfile = this.authService.getUserData();

  }
  // public messages :any =[{
  //   "sender":"User 1",
  //   "message" : "Hello this is my message",
  //   "timing" : "3.00pm",
  //   "isUser" : true
  // }, {
  //   "sender":"Elon Musk",
  //   "message" : "Hello this is my message",
  //   "timing" : "3.00pm",
  //   "isUser" : false
  // }]
}
