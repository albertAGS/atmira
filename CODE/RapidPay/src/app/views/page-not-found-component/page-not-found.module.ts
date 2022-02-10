import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { SharedComponentsModule } from "src/app/components/shared-components.module";
import { PageNotFoundComponent } from "./page-not-found.component";

const routes: Routes = [
  { path: '', component: PageNotFoundComponent }
];


@NgModule({
  declarations: [PageNotFoundComponent],
  imports: [
    RouterModule.forChild(routes),
    SharedComponentsModule
  ],
  exports: [PageNotFoundComponent]
})

export class PageNotFoundModule { }
