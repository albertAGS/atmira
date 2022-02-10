import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonsService } from 'src/app/services/commons.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  hideIcon: boolean;
  showIcon = 1;

  constructor(private router: Router, private commonService: CommonsService) { }

  ngOnInit() {
    this.hideIcon = window.location.href.includes('faqs') || window.location.href.includes('terms-conditions')
      || window.location.href.includes('privacy-polity');
    this.showIconConsumer();
  }

  goToHome(check) {
    if (!check) {
      return;
    }
    this.router.navigateByUrl('/home');
  }

  showIconConsumer() {
    const v = JSON.parse(sessionStorage.getItem('getParams'));
    this.showIcon = v ? v[0] : 1;
  }
}
