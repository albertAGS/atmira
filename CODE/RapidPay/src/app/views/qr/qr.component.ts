import { Component, OnInit } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { ActivatedRoute } from '@angular/router';


declare var $: any;
@Component({
  selector: 'app-qr',
  templateUrl: './qr.component.html',
  styleUrls: ['./qr.component.scss'],
  animations: [
    trigger('fade', [
      transition('void => *', [
        style({ opacity: 0 }),
        animate(1300, style({ opacity: 1 }))
      ])
    ])
  ]
})
export class QrComponent implements OnInit {

  termsRoute: string;
  headerFooter = true;

  constructor(
    private readonly route: ActivatedRoute
  ) { }

  ngOnInit() {
    const currentRoute = window.location.href;
    this.termsRoute = currentRoute.replace('qr', 'terms');
  }
}
