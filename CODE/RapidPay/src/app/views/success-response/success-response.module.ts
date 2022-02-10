import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { SharedComponentsModule } from "src/app/components/shared-components.module";
import { SuccessResponseComponent } from "./success-response.component";

const routes: Routes = [
  { path: '', component: SuccessResponseComponent }
];

@NgModule({
  declarations: [SuccessResponseComponent],
  imports: [
    RouterModule.forChild(routes),
    SharedComponentsModule
  ],
  exports: [SuccessResponseComponent]
})

export class SuccessResponseModule { }
