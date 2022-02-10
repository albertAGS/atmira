import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { slideToLeft } from '../animations/animation';
import { IAlert } from './alert.interface';
import { AlertService } from './alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
  animations: [slideToLeft()]
})
export class AlertComponent implements OnInit {

  public message: IAlert;

  constructor(private _alertService: AlertService) {}

  ngOnInit() {
    this._alertService.getMessage().subscribe((message: IAlert) => {
      if (!message) {
        this.message = null;
        return;
      }
      this.message = message
    })
  }

  public clearAlert() {
    this._alertService.clear()
  }

  public getTypeClass(type) {
    return `alert-${type}`;
  }
}
