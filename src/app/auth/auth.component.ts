import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserAuthModel } from '../common/models/UserAuthModel';
import { Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { ChatService } from '../shared/services/chat/chat.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  animations: [
    trigger('hoverAnimation', [
      state('start', style({
        width: '2em',
        left: 'calc(100% - 1.45em)'
      })),
      state('end', style({
        width: 'calc(100% + 1.3em)'
      })),
      transition('start <=> end', animate('0.6s ease'))
    ])
  ]
})
export class AuthComponent implements OnInit {
  loginForm!: FormGroup;
  hide = true;
  isLoggingIn = false;
  hoverState = 'start';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _authService: AuthService,
    private _chatService: ChatService
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  toggleAnimation() {
    this.hoverState = this.hoverState === 'start' ? 'end' : 'start';
  }
  login() {
    if (this.loginForm.valid) {
      this.isLoggingIn = true; // Show the spinner
      const formModel: UserAuthModel = this.loginForm.value as UserAuthModel;
      this._authService.login(formModel).subscribe(
        (response) => {
          if (response.status) {
            this._authService.storeUserData(response.data);
            this._chatService.createNewUser('angular-firebase@profmedservices.com','firebaseProfmed@2024');
            this.router.navigate(['/']);
          } else {
            console.error('Login failed', response.message);
          }
          this.isLoggingIn = false;
        },
        (error) => {
          this.isLoggingIn = false;
          console.error('Login failed', error);
        }
      );
    }
  }
}
