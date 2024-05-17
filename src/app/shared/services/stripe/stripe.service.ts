import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StripeService {

  constructor(private http: HttpClient) { }

  createPaymentIntent(data: any): Observable<any> {
    return this.http.post<any>(`${environment.stripeAPIUrl}/create-payment-intent`, data);
    // Adjust the endpoint according to your backend implementation
  }
}
