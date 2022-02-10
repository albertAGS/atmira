import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlertService } from 'src/app/views/management/component/alert/alert.service';
import { ManagementService } from 'src/app/views/management/services/management.service';

@Component({
  selector: 'app-pop-up-table',
  templateUrl: './pop-up-table.component.html',
  styleUrls: ['./pop-up-table.component.scss']
})
export class PopUpTableComponent implements OnInit {

  public validationForm: FormGroup;
  public ibanForm: FormGroup;
  public message = '';
  public password: string = 'password'
  public visibility: string = 'visibility'

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private readonly formBuilder: FormBuilder,
    private managementService: ManagementService,
    private _alertService: AlertService,
    private dialogRef: MatDialogRef<PopUpTableComponent>
  ) { }

  ngOnInit() {
    this.ibanForm = this.formBuilder.group({
      iban: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z]{2}[0-9]{2}(?:[ ]?[0-9]{4}){4}(?!(?:[ ]?[0-9]){3})(?:[ ]?[0-9]{1,2})?')]),
    }, {});
    this.validationForm = this.formBuilder.group({
      passPopUp: new FormControl('', Validators.required),
      code: new FormControl('', [Validators.required, Validators.pattern('^[0-9][0-9][0-9][0-9][0-9][0-9]$')])
    }, {});
    if (this.data.window === 'SCA') {
      this.managementService.getMethod('SCA').subscribe();
    }
  }

  public getErrors() {
    if (this.data.window === 'SCA' && this.validationForm.get('code').value) {
      return this.validationForm.get('code').errors && this.validationForm.get('passPopUp').dirty ? true : false
    } else if (this.data.window === 'IBAN' && this.ibanForm.get('iban')?.value) {
      return this.ibanForm.get('iban').errors && this.ibanForm.get('iban').dirty ? true : false
    }
    return true;
  }

  public changeIcon() {
    if (this.password === 'password') {
      this.password = 'text';
      this.visibility = 'visibility_off';
    } else {
      this.password ='password';
      this.visibility ='visibility';
    }
  }

  public sendForm() {
    if (this.validationForm.get('passPopUp').value) {
      const form = {
        key: this.validationForm.get('passPopUp').value,
        code: this.validationForm.get('code').value,
      };
      this.managementService.postMethod('SCA/Auth', form).subscribe((data: any) => {
        if (data.Ok) {
          this._alertService.message({ text: 'Se ha modificado correctamente', title: 'Correcto', type: 'succes' });
          this.dialogRef.close(this.ibanForm.get('iban').value);
        } else {
          this._alertService.message({ text: 'Valor introducido incorrectamtne', title: 'Error', type: 'error' });
        }
      });
    } else if (this.ibanForm.get('iban').value) {
      const form = {
        Usuario: this.ibanForm.get('iban').value,
      };
      this.managementService.getMethod('SCA').subscribe(data => {
        if (data['Ok']) {
          this.data.window = 'SCA'
        }
      });
    }
  }
}
