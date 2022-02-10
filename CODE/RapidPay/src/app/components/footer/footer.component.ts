import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonsService } from 'src/app/services/commons.service';
declare let window: any;

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  @Input() colorItems: string;
  @Input() classSpecial: boolean;
  year: number;

  constructor(private r: Router, private c: CommonsService) { }

  ngOnInit() {
    this.year = new Date().getFullYear();
  }
}
