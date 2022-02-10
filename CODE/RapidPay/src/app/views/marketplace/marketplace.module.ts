import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { SharedComponentsModule } from "src/app/components/shared-components.module";
import { MarketplaceComponent } from "./marketplace.component";

const routes: Routes = [
  { path: '', component: MarketplaceComponent }
];

@NgModule({
  declarations: [MarketplaceComponent],
  imports: [
    RouterModule.forChild(routes),
    SharedComponentsModule
  ],
  exports: [MarketplaceComponent]
})

export class MarketPlaceModule { }
