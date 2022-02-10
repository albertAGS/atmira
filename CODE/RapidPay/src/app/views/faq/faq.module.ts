import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedComponentsModule } from 'src/app/components/shared-components.module';
import { FaqComponent } from './faq.component';

const routes: Routes = [
    { path: '', component: FaqComponent },
];

@NgModule({
    declarations: [FaqComponent],
    imports: [RouterModule.forChild(routes),
      SharedComponentsModule],
    exports: [RouterModule]
})
export class FaqModule { }
