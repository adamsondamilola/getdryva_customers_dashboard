import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-make-payment',
  templateUrl: './make-payment.component.html',
  styleUrls: ['./make-payment.component.css'],
  template: ` <flutterwave-make-payment
  [public_key]="publicKey"
  amount='10'
  currency='NGN'
  payment_options="card"
  redirect_url=""
  text="Pay Now"
  [customer]="customerDetails"
  [customizations]="customizations"
  [meta]="meta"
  [tx_ref]="generateReference()"
  (callback)="makePaymentCallback($event)"
  (close)="closedPaymentModal()" >
</flutterwave-make-payment>`

})
export class MakePaymentComponent implements OnInit {

  constructor() {}

ngOnInit(): void {}

}
