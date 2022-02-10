import { Component, HostListener, OnInit, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { ManagementService } from '../services/management.service';
import { SigninService } from './signin.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  public portalForm: FormGroup;
  public message = '';
  public password: string = 'password'
  public visibility: string = 'visibility'

  constructor(
    private _signinService: SigninService,
    private readonly formBuilder: FormBuilder,
    private route: Router,
    private auth: AuthService,
    private _managementService: ManagementService) { }

  @HostListener('keydown', ['$event']) onKeyPressEvent($event) {
    const keyCode = $event.keyCode || $event.which;
    if (keyCode === 13) {
      this.sendForm();
    }
  }

  ngOnInit() {
    this.portalForm = this.formBuilder.group({
      user: new FormControl(''),
      pass: new FormControl('')
    }, {});
  }

  public changeIcon() {
    if (this.password === 'password') {
      this.password = 'text';
      this.visibility = 'visibility_off';

    } else {
      this.password = 'password';
      this.visibility = 'visibility';
    }
  }

  public sendForm() {
    sessionStorage.removeItem('Authorization')
    this.message = '';
    const form = {
      Code: this.portalForm.get('user').value,
      Key: this.portalForm.get('pass').value
    };
    this._signinService.login('Login', form).subscribe((data: {
      "Code": number,
      "Message": string,
      "Ok": boolean,
      "Token": string
    }) => {
      if (data["Ok"] === true) {
        this.auth.getAuth().subscribe();
        const destination = this._signinService.redirectUrl ? this.route.parseUrl(this._signinService.redirectUrl) : '/console/operations';
        this.route.navigateByUrl(destination);
      } else {
        this.message = 'El usuario o la contraseña que se ha introducido no són correctos';
      }
    })
  }
}
