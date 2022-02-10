import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { SharedComponentsModule } from "src/app/components/shared-components.module";
import { ResponsePaymentComponent } from "./response-payment.component";

const routes: Routes = [
  { path: '', component: ResponsePaymentComponent }
];


@NgModule({
  declarations: [ResponsePaymentComponent],
  imports: [
    RouterModule.forChild(routes),
    SharedComponentsModule
  ],
  exports: [ResponsePaymentComponent]
})

export class ResponsePaymentModule { }
