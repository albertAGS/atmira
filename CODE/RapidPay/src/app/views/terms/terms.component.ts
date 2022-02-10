import { Component, OnInit } from '@angular/core';
import { CONSTANTS } from '../../shared/constants';
import { trigger, style, animate, transition } from '@angular/animations';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonsService } from 'src/app/services/commons.service';
import { InitService } from 'src/app/services/init.service';
import { TermsService } from 'src/app/services/terms.service';
import { Route } from '@angular/compiler/src/core';
import { PaymentService } from 'src/app/services/payment.service';

@Component({
  selector: 'app-terms',
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.scss'],
  animations: [
    trigger('fade', [
      transition('void => *', [
        style({ opacity: 0 }),
        animate(1300, style({ opacity: 1 }))
      ])
    ])
  ]
})
export class TermsComponent implements OnInit {

  headerFooter = true;
  idPeticion = '';
  showLoading = false;
  responseOk = false;
  initData: any = {};
  termsForm: FormGroup;
  object: any = {};
  pdfOpen = {
    precontract: false,
    termsAndConditions: false
  };
  onBoarding = false;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly ar: ActivatedRoute,
    private readonly cs: CommonsService,
    private readonly initService: InitService,
    private readonly termsService: TermsService,
    private readonly r: Router,
    private readonly ps: PaymentService
  ) { }

  ngOnInit() {
    this.init(true);
  }

  closeOnBoarding() {
    this.onBoarding = false;
    this.responseOk = false;
    this.init(false);
  }

  getBtnClass() {
    return this.termsForm.valid ? 'enabled' : 'disabled';
  }

  onChangeCheckbox(ev: any, field: string, compulsory?: boolean) {
    if (!this.pdfOpen[field] && compulsory) {
      this.downloadFile(field);
    }

    const value = ev.checked ? true : null;
    this.termsForm.controls[field].setValue(value);
  }

  submit() {
    this.showLoading = true;
    const data: any = {
      EstadoTyC: 'SI',
      Precontractual: 'SI',
      IdPeticion: this.initData.IdPeticion || this.idPeticion
    };
    if (this.object.DNI) {
      data.DNI = this.object.DNI;
      data.NombreOrdenante = this.object.NombreOrdenante;
    }
    this.termsService.post(data).subscribe((response: any) => {
      this.redirect(response.IdServicio);
      sessionStorage.setItem('service', response.Service || response.IdServicio)
    }, (err) => {
      this.showLoading = false;
      console.error(err)

    });

  }

  downloadFile(field: string) {
    if (!this.pdfOpen[field]) {
      this.pdfOpen[field] = true;
    }
    fetch(`./assets/pdf/${field}.pdf`)
      .then(resp => resp.blob())
      .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        // the filename you want
        a.download = `${field}.pdf`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      })
      .catch(() => console.log('err'));
  }

  private init(onBoardingSetting ?: boolean) {
    this.ar.queryParams.subscribe((d) => {
      if (!d) {
        return;
      }
      if (d.data) {
        this.object = this.cs.decrypt(d.data) || {};
        this.object.Callback_OK = decodeURIComponent(this.object.Callback_OK);
        this.object.Callback_KO = decodeURIComponent(this.object.Callback_KO);
        sessionStorage.setItem('marketData', JSON.stringify(this.object));
        if (!sessionStorage.getItem('operationData')) {
          this.initService.init(this.object).subscribe((data: any) => {
            if (!data.Ok) {
              return;
            }
            this.setOnBoarding(data);
            this.showLoading = false;
            this.initData = data;
            this.responseOk = true;
            sessionStorage.setItem('operationData', JSON.stringify(data));
          }, (err) => this.showLoading = false)
        } else {
          this.showLoading = false;
          this.initData = JSON.parse(sessionStorage.getItem('operationData'));
          this.responseOk = true;
        }
      } else if (d.idPeticion) {
        if (onBoardingSetting) {
          this.setOnBoarding(d);
        }
        this.idPeticion = d.idPeticion;
        this.responseOk = true;
        this.showLoading = false;
        sessionStorage.setItem('idPeticion', d.idPeticion);
      }
    });
    this.termsForm = this.formBuilder.group({
      terminos_y_condiciones_rapidpay: new FormControl(null, [Validators.required]),
      precontractual_rapidpay: new FormControl(null, [Validators.required])
    }, {});
  }

  private setOnBoarding(data: any = {}) {
    if (data.URL_Redirect) {
      this.onBoarding = data.URL_Redirect.indexOf('onBoarding=S') !== -1;
    }
    if (data.onBoarding) {
      this.onBoarding = data.onBoarding === 'S';
    }
  }

  private redirect(service: string): void {
    const mapService = {
      1: 'P_Pay',
      9: 'RX_Pay'
    };
    if (mapService[service]) {
      this.ps.methodPayment(
        {
          Id_Peticion: this.initData.IdPeticion || this.idPeticion,
          CC_Origen: this.object.CC_Origen || null
        }, mapService[service]
      ).subscribe((d: any) => {
        this.showLoading = false;
        if (d.Code === 200) {
          window.open(d.URL_oAuth, '_self');
        }
      }, (err) => {
        console.error(err);
        this.showLoading = false;
      });
    } else {
      this.showLoading = false;
      this.r.navigateByUrl('/login');
    }
  }
}
