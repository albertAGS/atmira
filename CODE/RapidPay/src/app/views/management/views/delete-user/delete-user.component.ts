import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AlertService } from '../../component/alert/alert.service';
import { ManagementService } from '../../services/management.service';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.scss']
})
export class DeleteUserComponent implements OnInit {

  public deleteUser: FormGroup;

  constructor(private _fb: FormBuilder,
    private _alertService: AlertService,
    private dialogRef: MatDialogRef<DeleteUserComponent>,
    private _managementService: ManagementService) { }

  ngOnInit() {
    this.deleteUser = this._fb.group({
      'Documento': new FormControl('', Validators.required),
    }, {});
  }

  public userToDelete() {
    this._managementService.postMethod('DeleteUser', this.deleteUser.value).subscribe(data => {
      if (data['Ok']) {
        this._alertService.message({ text: `Usuario elimininado`, title: 'Correcto', type: 'succes' });
        this.dialogRef.close();
      } else {
        this._alertService.message({ text: `El usuario no se ha podido eliminar`, title: 'Error', type: 'error' });
      }
    })
  }
}
