import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedComponentsModule } from 'src/app/components/shared-components.module';
import { OnBoardingComponent } from './onboarding/onboarding.component';
import { TermsComponent } from './terms.component';

const routes: Routes = [
    { path: '', component: TermsComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes),
      SharedComponentsModule],
    declarations: [TermsComponent, OnBoardingComponent],
    exports: [RouterModule]
})
export class TermsModule { }
