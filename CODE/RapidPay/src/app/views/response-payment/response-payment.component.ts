import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InfoPayService } from 'src/app/services/info-pay.service';

@Component({
  selector: 'app-response-payment',
  templateUrl: './response-payment.component.html',
  styleUrls: ['./response-payment.component.scss']
})
export class ResponsePaymentComponent implements OnInit {

  view: boolean;
  callBackURL: string = '';
  payData: any;
  currencyMap = {
    EUR: '€',
    USD: '$'
  };
  today = new Date();
  date = String( this.today.getDate()).padStart(2, '0') + '/' + String(this.today.getMonth()+1).padStart(2, '0') + '/' + this.today.getFullYear();
  
  constructor(private router: Router, private activateRoute: ActivatedRoute, private ip: InfoPayService) { }

  ngOnInit(): void {
    this.activateRoute.params.subscribe(d => {
      this.view = d.res == 'error' ? false : true;
      this.ip.infoPayment(d.reference).subscribe((d: any) => {
        this.callBackURL = d.url_Callback;
        this.payData = d;
      });
    });
  }

  close = () => { window.location.href = this.callBackURL }

  getIban(iban) {
    return '**** ' + iban.substr(iban.length - 4);
  }

}
