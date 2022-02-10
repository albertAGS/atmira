import { Component, OnInit } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss'],
  // animations: [
  //   trigger('fade', [
  //     transition('void => *', [
  //       style({ opacity: 0 }),
  //       animate(1300, style({ opacity: 1 }))
  //     ])
  //   ])
  // ]
})
export class FaqComponent implements OnInit {

  headerFooter = true;
  showLoading = false;
  responseOk = false;
  dataAccess;
  showName;
  
  constructor(
    private readonly translation: TranslateService,
    private r: Router,
    private location: Location
  ) { }

  ngOnInit() {
    this.showName = !window.location.href.includes('/faqs');
    this.translation.get(['FAQS.ANSWERS', 'FAQS.QUESTIONS']).subscribe(data => {
      this.showLoading = false;
      this.responseOk = true;
      this.dataAccess = data['FAQS.QUESTIONS'];
    });
  }

  goBack() {
    this.location.back();
  }

}
