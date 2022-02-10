import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SharedComponentsModule } from "src/app/components/shared-components.module";

import { LoginComponent } from './login.component';


const routes: Routes = [
  { path: '', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes),
    SharedComponentsModule
  ],
  declarations: [LoginComponent],
  exports: [LoginComponent]
})

export class LoginModule { }
