import { Component, OnInit, SecurityContext } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { CommonsService } from 'src/app/services/commons.service';
import { PaymentService } from 'src/app/services/payment.service';
import * as dayjs from 'dayjs'
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-marketplace',
  templateUrl: './marketplace.component.html',
  styleUrls: ['./marketplace.component.scss']
})
export class MarketplaceComponent implements OnInit {

  ASPaymentForm: FormGroup;
  PPaymentForm: FormGroup;
  APaymentForm: FormGroup;
  SPaymentForm: FormGroup;
  TVPaymentForm: FormGroup;
  BServiceForm: FormGroup;
  ZServiceForm: FormGroup;
  VServiceForm: FormGroup;
  RXPaymentForm: FormGroup;
  DServiceForm: FormGroup;
  rf: number;
  message: string;
  modalMessage: string;
  payParam: any;
  urlPayOk = window.location.origin + '/portal/marketplace?pay=ok';
  urlPayKo = window.location.origin + '/portal/marketplace?pay=ko';
  frecuencies: Array<any> = [
    { value: 'Daily', text: 'Diario' },
    { value: 'Weekly', text: 'Semanal', executionDay: 'weekDays' },
    { value: 'EveryTwoWeeks', text: 'Bisemanal', executionDay: 'weekDays' },
    { value: 'Monthly', text: 'Mensual', executionDay: 'monthDays' },
    { value: 'EveryTwoMonths', text: 'Bimestral', executionDay: 'monthDays' },
    { value: 'Quarterly', text: 'Cuatrimestral', executionDay: 'monthDays' },
    { value: 'SemiAnnual', text: 'Semestral', executionDay: 'monthDays' },
    { value: 'Annual', text: 'Anual', executionDay: 'monthDays' }
  ];
  executionDays = [];
  initMinDate = new Date();
  endMinDate = new Date();
  akanaUrl: any;


  constructor(
    private f: FormBuilder,
    private r: Router,
    private cs: CommonsService,
    private ps: PaymentService,
    private route: ActivatedRoute,
    private dateAdapter: DateAdapter<Date>,
    private http: HttpClient,
    private sanitizer: DomSanitizer
  ) {
    this.dateAdapter.setLocale('es-ES');
  }

  ngOnInit(): void {

    sessionStorage.removeItem('operationData');
    // this.ps.getLastReference().subscribe((d: any) => { this.rf = ++d; });
    this.createForms();
    this.setModalPay();
    this.setPayFrecuency();
    this.initMinDate.setDate(this.initMinDate.getDate() + 1);
    this.endMinDate.setDate(this.initMinDate.getDate() + 1);
    this.akanaUrl =  this.sanitizer.bypassSecurityTrustResourceUrl( environment.akanaUrl + 'widget');
  }


  private createForms = () => {
    this.ASPaymentForm = this.f.group({
      price: new FormControl({ value: '1€', disabled: true }),
      price2: new FormControl({ value: '0,5€', disabled: true }),
      price3: new FormControl({ value: '0,5€', disabled: true }),
      ref: new FormControl({ value: '', disabled: false }, Validators.required),
      ref2: new FormControl({ value: '', disabled: false }, Validators.required),
      DNI: new FormControl({ value: '', disabled: false }, Validators.required),
      nombreOrdenante: new FormControl({ value: '', disabled: false }, Validators.required),
      callBackOK: new FormControl({ value: this.urlPayOk, disabled: false }, Validators.required),
      callBackKO: new FormControl({ value: this.urlPayKo, disabled: false }, Validators.required),
      FechaInicio: new FormControl({ value: '', disabled: false }, Validators.required),
      FechaFin: new FormControl({ value: '', disabled: false }, Validators.required),
      Frecuencia: new FormControl({ value: '', disabled: false }, Validators.required),
      FechaEjecucion: new FormControl({ value: '', disabled: false }, Validators.required),
      CC_Origen: new FormControl({ value: '', disabled: false }, Validators.required),
      DestinationAccount: new FormControl({ value: '', disabled: false }, Validators.required)
    }, {});

    this.PPaymentForm = this.f.group({
      origin: new FormControl({ value: '', disabled: false }, [Validators.required]),
      currency: new FormControl({ value: 'EUR', disabled: true }, Validators.required),
      destiny: new FormControl({ value: '', disabled: false }, Validators.required),
      amount: new FormControl({ value: '', disabled: false }, Validators.required),
      ref: new FormControl({ value: '', disabled: false }, Validators.required),
      beneficiary: new FormControl({ value: '', disabled: false }, Validators.required),
      DNI: new FormControl({ value: '', disabled: false }, Validators.required),
      nombreOrdenante: new FormControl({ value: '', disabled: false }, Validators.required),
      callBackOK: new FormControl({ value: this.urlPayOk, disabled: false }, Validators.required),
      callBackKO: new FormControl({ value: this.urlPayKo, disabled: false }, Validators.required)
    }, {});

    this.RXPaymentForm = this.f.group({
      APP_NAME: new FormControl({ value: 'Test', disabled: false }, [Validators.required]),
      Reference: new FormControl({ value: '', disabled: false }, [Validators.required]),
      APP_KEY: new FormControl({ value: '00x0x000-00x0-0000-xx00-x000xx0xx0xx', disabled: false }, [Validators.required]),
      Moneda: new FormControl({ value: 'EUR', disabled: false }, [Validators.required]),
      Importe: new FormControl({ value: '', disabled: false }, [Validators.required]),
      NombreOrdenante: new FormControl({ value: '', disabled: false }, [Validators.required]),
      DNI: new FormControl({ value: '', disabled: false }, [Validators.required]),
      Callback_OK: new FormControl({ value: this.urlPayOk, disabled: false }, [Validators.required]),
      Callback_KO: new FormControl({ value: this.urlPayKo, disabled: false }, [Validators.required]),
      Service: new FormControl({ value: 'RX', disabled: false }, [Validators.required]),
      FechaInicio: new FormControl({ value: '', disabled: false }, [Validators.required]),
      FechaFin: new FormControl({ value: '', disabled: false }, [Validators.required]),
      Frecuencia: new FormControl({ value: 'Daily', disabled: false }, [Validators.required]),
      FechaEjecucion: new FormControl({ value: '', disabled: false }, [Validators.required]),
      CC_Origen: new FormControl({ value: '', disabled: false }, [Validators.required]),
      CC_Destino: new FormControl({ value: '', disabled: false }, [Validators.required]),
      Beneficiario: new FormControl({ value: '', disabled: false }, [Validators.required]),
    }, {});

    this.APaymentForm = this.f.group({
      origin: new FormControl({ value: '', disabled: false }, [Validators.required]),
      currency: new FormControl({ value: 'EUR', disabled: true }, Validators.required),
      amount: new FormControl({ value: '', disabled: false }, Validators.required),
      ref: new FormControl({ value: '', disabled: false }, Validators.required),
      DNI: new FormControl({ value: '', disabled: false }, Validators.required),
      nombreOrdenante: new FormControl({ value: '', disabled: false }, Validators.required),
    }, {});

    this.SPaymentForm = this.f.group({
      APP_NAME: new FormControl({ value: 'Test', disabled: false }, [Validators.required]),
      APP_KEY: new FormControl({ value: '00x0x000-00x0-0000-xx00-x000xx0xx0xx', disabled: false }, [Validators.required]),
      CC_Destino: new FormControl({ value: '', disabled: false }, [Validators.required]),
      Reference: new FormControl({ value: '', disabled: false }, [Validators.required]),
      Moneda: new FormControl({ value: 'EUR', disabled: false }, [Validators.required]),
      Importe: new FormControl({ value: '', disabled: false }, [Validators.required]),
      Beneficiario: new FormControl({ value: '', disabled: false }, [Validators.required]),
      NombreOrdenante: new FormControl({ value: '', disabled: false }, [Validators.required]),
      DNI: new FormControl({ value: '', disabled: false }, Validators.required),
      Callback_OK: new FormControl({ value: this.urlPayOk, disabled: false }, Validators.required),
      Callback_KO: new FormControl({ value: this.urlPayKo, disabled: false }, Validators.required)
    }, {});
    this.TVPaymentForm = this.f.group({
      currency: new FormControl({ value: 'EUR', disabled: true }, Validators.required),
      destiny: new FormControl({ value: '', disabled: false }, [Validators.required]),
      amount: new FormControl({ value: '', disabled: false }, Validators.required),
      beneficiary: new FormControl({ value: '', disabled: false }, Validators.required),
      ref: new FormControl({ value: '', disabled: false }, Validators.required),
    }, {});
    this.BServiceForm = this.f.group({
      Reference: new FormControl({ value: '', disabled: false }, Validators.required)
    }, {});
    this.ZServiceForm = this.f.group({
      Reference: new FormControl({ value: '', disabled: false }, Validators.required)
    }, {});
    this.VServiceForm = this.f.group({
      CC_Destino: new FormControl({ value: '', disabled: false }, Validators.required),
      Solicitante: new FormControl({ value: '', disabled: false }, Validators.required),
      DNI: new FormControl({ value: '', disabled: false }, Validators.required),
      Reference: new FormControl({ value: '', disabled: false }, Validators.required)
    }, {});
    this.DServiceForm = this.f.group({
      Reference: new FormControl({ value: '', disabled: false }, Validators.required),
      Moneda: new FormControl({ value: 'EUR', disabled: false }, Validators.required),
      Importe: new FormControl({ value: '', disabled: false }, Validators.required),
      NombreOrdenante: new FormControl({ value: '', disabled: false }, Validators.required),
      DNI: new FormControl({ value: '', disabled: false }, Validators.required),
      Callback_OK: new FormControl({ value: this.urlPayOk, disabled: false }, Validators.required),
      Callback_KO: new FormControl({ value: this.urlPayKo, disabled: false }, Validators.required)
    }, {});
  }


  thwrowPayment = (payment: number, num?: number, url?: string) => {
    let model: any;
    const map = {
      1: {
        Importe: this.ASPaymentForm.get('price').value.replace('€', ''),
        Service: 'AS'
      },
      2: {
        Importe: this.ASPaymentForm.get('price2').value.replace('€', ''),
        Service: 'XS'
      },
      3: {
        Importe: this.ASPaymentForm.get('price3').value.replace('€', ''),
        Service: 'S'
      }
    };
    switch (payment) {
      case 1:
        let add = {};
        model = {
          APP_NAME: 'Test',
          Reference: this.ASPaymentForm.get('ref').value,
          APP_KEY: '00x0x000-00x0-0000-xx00-x000xx0xx0xx',
          Moneda: 'EUR',
          Importe: map[num].Importe,
          NombreOrdenante: this.ASPaymentForm.get('nombreOrdenante').value,
          DNI: this.ASPaymentForm.get('DNI').value,
          Service: map[num].Service,
          Callback_OK: encodeURIComponent(this.ASPaymentForm.get('callBackOK').value),
          Callback_KO: encodeURIComponent(this.ASPaymentForm.get('callBackKO').value)

        };
        this.r.navigateByUrl('/' + url + '?data=' + this.cs.encrypt(model));
        break;

      case 2:
        model = {
          APP_NAME: 'Test',
          Reference: this.PPaymentForm.get('ref').value,
          APP_KEY: '00x0x000-00x0-0000-xx00-x000xx0xx0xx',
          Moneda: 'EUR',
          Importe: this.PPaymentForm.get('amount').value,
          CC_Origen: this.PPaymentForm.get('origin').value,
          CC_Destino: this.PPaymentForm.get('destiny').value,
          Beneficiario: this.PPaymentForm.get('beneficiary').value,
          NombreOrdenante: this.PPaymentForm.get('nombreOrdenante').value,
          DNI: this.PPaymentForm.get('DNI').value,
          Service: 'P',
          Callback_OK: encodeURIComponent(this.PPaymentForm.get('callBackOK').value),
          Callback_KO: encodeURIComponent(this.PPaymentForm.get('callBackKO').value)
        };
        this.r.navigateByUrl('/' + url + '?data=' + this.cs.encrypt(model));
        break;

      case 3:
        model = {
          APP_NAME: 'Test',
          Reference: this.TVPaymentForm.get('ref').value,
          APP_KEY: '00x0x000-00x0-0000-xx00-x000xx0xx0xx',
          Moneda: 'EUR',
          CC_Destino: this.TVPaymentForm.get('destiny').value,
          Importe: this.TVPaymentForm.get('amount').value,
          Beneficiario: this.TVPaymentForm.get('beneficiary').value,
          endPoint: 'TVService',
        };
        this.ps.methodPayment(model, 'TVService').subscribe((d: any) => {
          alert(d.Message);
          if (d.Code === 200) {
            alert('Traspaso realizado');
          }
        });
        break;

      case 4:
        model = this.RXPaymentForm.value;
        model.FechaInicio = dayjs(model.FechaInicio).format('YYYY-MM-DD');
        model.FechaFin = dayjs(model.FechaFin).format('YYYY-MM-DD');
        this.r.navigateByUrl('/' + url + '?data=' + this.cs.encrypt(model));
        break;
    }

  }

  callService(payment: string) {
    const obj = {
      APP_NAME: 'Test',
      APP_KEY: '00x0x000-00x0-0000-xx00-x000xx0xx0xx'
    }
    const map = {
      B_Pay: {
        form: 'BServiceForm',
        message: 'Descarga de saldos '
      },
      Z_Pay: {
        form: 'ZServiceForm',
        message: 'Retroceder operación '
      },
      D_Service: {
        form: 'DServiceForm',
        message: 'Transferencia directa '
      },
      V_Pay: {
        form: 'VServiceForm',
        message: 'Validación de cuenta '
      }
    };

    const body = Object.assign(obj, this[map[payment].form].value);

    this.ps.methodPayment(body, payment).subscribe(
      (res: any) => {
        if (res.Code === 200) {
          alert(map[payment].message + 'completada');
        } else {
          alert('Error en ' + map[payment].message + ' - ' + res.Message);
        }
      },
      (err) => alert('Error en ' + map[payment].message + err)
    )
  }

  PaySService(url: string): void {
    const model = this.SPaymentForm.value;
    model.Service = 'S';
    this.http.post(environment.url + 'OnInit', model).subscribe((data: any) => {
      if (!data.URL_Redirect) {
        return;
      }
      window.location.href = data.URL_Redirect;
    });
  }

  private setModalPay() {
    const modalMessageMap = {
      ok: 'El pago se ha realizado correctamente',
      ko: 'Ha habido un error al realizar el pago'
    };
    this.payParam = this.route.snapshot.queryParams.pay;
    if (this.payParam) {
      this.modalMessage = modalMessageMap[this.payParam];
    }

  }

  private setPayFrecuency() {
    const days = {
      monthDays: [],
      weekDays: [
        { value: '01', text: 'Lunes' },
        { value: '02', text: 'Martes' },
        { value: '03', text: 'Miércoles' },
        { value: '04', text: 'Jueves' },
        { value: '05', text: 'Viernes' },
        { value: '06', text: 'Sábado' },
        { value: '07', text: 'Domingo' }
      ]
    }
    const zeroPad = (num, places) => String(num).padStart(places, '0');
    for (let i = 0; i < 31; i++) {
      const num = zeroPad(i + 1, 2);
      days.monthDays.push({ value: num, text: num })
    };
    this.RXPaymentForm.controls.Frecuencia.valueChanges.subscribe(val => {
      const obj = this.frecuencies.find(frec => val === frec.value);
      this.executionDays = days[obj.executionDay] || [];
      this.RXPaymentForm.controls.FechaEjecucion.setValue('01');
    });
    this.RXPaymentForm.controls.FechaInicio.valueChanges.subscribe(val => {
      this.endMinDate = val;
    });
  }
}

