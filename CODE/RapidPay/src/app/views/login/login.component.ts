import { Component, OnInit } from '@angular/core';
import { CONSTANTS } from '../../shared/constants';
import { trigger, style, animate, transition } from '@angular/animations';
import { PaymentService } from 'src/app/services/payment.service';
import { GetBanksService } from 'src/app/services/get-banks.service';
import { CommonsService } from 'src/app/services/commons.service';


declare var $: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [
    trigger('fade', [
      transition('void => *', [
        style({ opacity: 0 }),
        animate(1300, style({ opacity: 1 }))
      ])
    ])
  ]
})
export class LoginComponent implements OnInit {

  entities: any;
  mainEntities: any;
  ent: any;
  nameCredentials = [];
  bankSelected: string;
  refreshEntityCode = true;
  headerFooter = true;
  object: any;
  operationData: any;
  showLoading = false;

  constructor(
    private payService: PaymentService,
    private entitiesService: GetBanksService,
    private cs: CommonsService
  ) { }

  ngOnInit() {
    this.object = JSON.parse(sessionStorage.getItem('marketData'));
    this.operationData = JSON.parse(sessionStorage.getItem('operationData')) || {};
    this.getEntities();
  }

  getEntities = () => {
   
    this.entities = CONSTANTS.entities;
    this.entitiesService.getEntities().subscribe((data: any) => {
      this.entities = data.Entities;
      this.mainEntities =  data.Entities.slice(0, 6);
    });
  }

  findImg = (bankId) => {
    const entity = CONSTANTS.entities.filter(data => data.code === bankId)[0];
    return (entity) ? entity.code : false;
  }

  goToUrl = (bank) => {
    if (this.object) {
      this.object['Entity'] = bank;
    }
    this.showLoadingMethod(true);
    const mapEndpoint = {
      4: 'AS_Pay',
      8: 'XS_Pay',
      2: 'S_Pay'
    };
    const service = mapEndpoint[sessionStorage.getItem('service')]; 
    const data = {
      Entity: bank,
      IdPeticion: this.operationData.IdPeticion || sessionStorage.getItem('idPeticion')
    }
    this.payService.methodPayment(data, service).subscribe((d: any) => {
      if (d.Code === 200) {
        window.open(d.URL_oAuth, '_self');
      }
      setTimeout(() => { this.showLoadingMethod(false) }, 2500);
    });
  }

  disableDragging = (event) => {
    event.preventDefault();
  }

  getEntity = (e) => {
    this.showLoadingMethod(true);
    this.goToUrl(e.Id_Entitie);
  }

  private showLoadingMethod = (value: boolean) => {
    this.showLoading = value;
    if (!value) {
      document.querySelector('body').style.overflow = '';
    }
  }
}
