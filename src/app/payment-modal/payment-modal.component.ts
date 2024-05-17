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
import { StripeService } from '../shared/services/stripe/stripe.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import axios from 'axios';
import { ApiService } from '../shared/services/api/api.service';
import { APIConstant } from '../common/constants/APIConstant';

@Component({
  selector: 'app-payment-modal',
  templateUrl: './payment-modal.component.html',
  styleUrls: ['./payment-modal.component.scss'],
})
export class PaymentModalComponent implements OnInit {
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

  constructor(
    private _stripeService: StripeService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<PaymentModalComponent>,
    private _apiService: ApiService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  ngOnInit() {
    this.showSpinner = true;
    try {
      axios
        .post(environment.stripeAPIUrl + '/create-payment-intent', {
          amount: this.data.amount,
          currency: 'USD',
          customer_id: this.data.customer_id,
          pid: this.data.pid,
        })
        .then((pi: any) => {
          if (pi.status === 200) {
            console.log(pi);
            this.intentData = pi;
            this.elementsOptions.clientSecret = pi.data.client_secret as string;
            this.showSpinner = false;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    } finally {
      // this.showSpinner = false;
    }
  }

  pay() {
    if (this.paying()) return;
    this.paying.set(true);
    this.stripe
      .confirmPayment({
        elements: this.paymentElement.elements,
        confirmParams: {
          payment_method_data: {
            billing_details: {
              name: this.data.name,
              email: this.data.email,
              address: this.data.address,
            },
          },
        },
        redirect: 'if_required',
      })
      .subscribe((result) => {
        this.paying.set(false);
        console.log('Result', result);
        if (result.error) {
          // Show error to your customer (e.g., insufficient funds)
          alert({ success: false, error: result.error.message });
        } else {
          // The payment has been processed!
          if (result.paymentIntent.status === 'succeeded') {
            this.dialogRef.close(result.paymentIntent);
          }
        }
      });
  }

  public onNoClick() {
    this.dialogRef.close();
  }
}
