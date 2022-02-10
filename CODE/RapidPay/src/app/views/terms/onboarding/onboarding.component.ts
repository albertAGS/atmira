import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CommonsService } from 'src/app/services/commons.service';
declare let window: any;

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.component.html',
  styleUrls: ['./onboarding.component.scss']
})
export class OnBoardingComponent {

  @Output() continue = new EventEmitter<any>();

  constructor(private r: Router, private c: CommonsService) { }

  emitContinue() {
    this.continue.emit();
  }

}
