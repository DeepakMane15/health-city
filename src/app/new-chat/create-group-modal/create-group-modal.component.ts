import {
  Component,
  Inject,
  OnInit,
  ViewChild,
  inject,
  signal,
} from '@angular/core';
import { FormBuilder, UntypedFormBuilder, Validators } from '@angular/forms';
import {
  StripeElementsOptions,
  StripePaymentElementOptions,
} from '@stripe/stripe-js';
import { StripePaymentElementComponent, injectStripe } from 'ngx-stripe';
import { environment } from 'src/environments/environment';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import axios from 'axios';
import { ApiService } from 'src/app/shared/services/api/api.service';
import { ChatService } from 'src/app/shared/services/chat/chat.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-create-group-modal',
  templateUrl: './create-group-modal.component.html',
  styleUrls: ['./create-group-modal.component.scss'],
})
export class CreateGroupModalComponent implements OnInit {
  @ViewChild(StripePaymentElementComponent)
  paymentElement!: StripePaymentElementComponent;

  elementsOptions: StripeElementsOptions = {
    locale: 'en',
    appearance: {
      theme: 'flat',
    },
  };

  paymentElementOptions: StripePaymentElementOptions = {
    layout: {
      type: 'tabs',
      defaultCollapsed: false,
      radios: false,
      spacedAccordionItems: false,
    },
  };

  // Replace with your own public key
  stripe = injectStripe(environment.publishableKey);
  paying = signal(false);
  public showSpinner: boolean = false;
  public intentData: any;
  public checkedId: any = [];
  public groupName!: string;
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<CreateGroupModalComponent>,
    private _apiService: ApiService,
    private _chatService: ChatService,
    private _authService: AuthService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  ngOnInit() {
    console.log('from create modal : ', this.data);
  }

  public onNoClick() {
    console.log('from create modal : ', this.data);

    this.dialogRef.close();
  }

  public handleSelect(check: boolean, d: any) {
    if (check) {
      this.checkedId.push(d.id);
      return;
    }
    let index = this.checkedId.find((c: any) => c === d.id);
    if (index > -1) {
      this.checkedId.splice(index, 1);
    }
  }

  public createGroup() {
    let userData = this._authService.getUserData();
    // console.log(userData);

    // return;
    let group = {
      companyId: userData.id,
      companyName: userData.company_name,
      members: [...this.checkedId, userData.id],
      name: this.groupName,
      icon: 'https://app.profmedservices.com/assets/admin/file/documents/group-chat.png',
      timestamp: new Date(),
      type: 'group',
      active: true,
      hideMessageAfter: '12h',
    };
    this._chatService.createGroup(group);
    this.dialogRef.close();

  }
}
