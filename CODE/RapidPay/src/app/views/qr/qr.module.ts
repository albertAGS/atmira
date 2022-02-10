import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QRCodeModule } from 'angularx-qrcode';
import { QrComponent } from './qr.component';

const routes: Routes = [
    { path: '', component: QrComponent },
];

@NgModule({
  declarations: [
    QrComponent
  ],
    imports: [RouterModule.forChild(routes),
      QRCodeModule,
      CommonModule,
    ],
    exports: [RouterModule]
})
export class QrModule { }
