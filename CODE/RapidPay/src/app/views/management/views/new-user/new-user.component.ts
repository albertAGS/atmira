import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { equalToValidator } from 'src/app/components/validators';
import { AlertService } from '../../component/alert/alert.service';
import { ManagementService } from '../../services/management.service';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss']
})
export class NewUserComponent implements OnInit {

  public listApps: {
    "id_app": number,
    "app_name": string
  }[];
  public listRoles: {
    "Role_id": string,
    "Role_name": string
  }[];
  public newUser: FormGroup;

  constructor(
    private _alertService: AlertService,
    private dialogRef: MatDialogRef<NewUserComponent>,
    private _fb: FormBuilder,
    private _managementService: ManagementService,
  ) { }

  ngOnInit(): void {
    this._managementService.getMethod('OnInitUser').subscribe(data => {
      this.listApps = data.listApps;
      this.listRoles = data.listRoles;
      this._getForm()
    })
  }

  public getError() {
    return this.newUser.get('Contrasena').errors?.equalTo &&
      this.newUser.get('Contrasena').dirty &&
      this.newUser.get('Contrasena').get('Contrasena1').value &&
      this.newUser.get('Contrasena').get('Contrasena2').value ? true : false
  }

  public userToCreate() {
    this.newUser.value.Contrasena = this.newUser.value.Contrasena?.Contrasena1
    this._managementService.postMethod('SaveUser', this.newUser.value).subscribe(data => {
      if (data['Ok']) {
        if (data.Ok) {
          this._alertService.message({ text: `Usuario ${this.newUser.get('Usuario').value} creado`, title: 'Correcto', type: 'succes' });
          this.dialogRef.close();
        } else {
          this._alertService.message({ text: 'No se ha podido crear el Usuario', title: 'Error', type: 'error' });
        }
      }
    })
  }

  private _getForm() {
    this.newUser = this._fb.group({
      'App': new FormControl('', Validators.required),
      'Rol': new FormControl('', Validators.required),
      'Nombre': new FormControl('', Validators.required),
      'Apellido_1': new FormControl('', Validators.required),
      'Apellido_2': new FormControl('', Validators.required),
      'Usuario': new FormControl('', Validators.required),
      'Documento': new FormControl('', Validators.required),
      'Email': new FormControl('', [Validators.email, Validators.required]),
      'Accion': new FormControl('CREATE'),
    }, {});
    const formRange = this._fb.group({});
    formRange.addControl('Contrasena1', new FormControl('', [Validators.required]));
    formRange.addControl('Contrasena2', new FormControl('', [Validators.required]));
    this.newUser.addControl('Contrasena', formRange);
    this.newUser.get('Contrasena').setValidators(
      equalToValidator(['Contrasena1', 'Contrasena2']));
  }
}
