import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/marketplace', pathMatch: 'full' },
  { path: 'terms', loadChildren: () => import('./views/terms/terms.module').then(module => module.TermsModule) },
  { path: 'login', loadChildren: () => import('./views/login/login.module').then(module => module.LoginModule) },
  { path: 'qr', loadChildren: () => import('./views/qr/qr.module').then(module => module.QrModule) },
  { path: 'faq', loadChildren: () => import('./views/faq/faq.module').then(module => module.FaqModule) },
  { path: 'marketplace', loadChildren: () => import('./views/marketplace/marketplace.module').then(module => module.MarketPlaceModule) },
  { path: 'response/:id', loadChildren: () => import('./views/success-response/success-response.module').then(module => module.SuccessResponseModule) },
  { path: 'console', loadChildren: () => import('./views/management/management.module').then(module => module.ManagementModule) },
  { path: 'payment-response/:res/:reference', loadChildren: () => import('./views/response-payment/response-payment.module').then(module => module.ResponsePaymentModule) },
  { path: 'page-not-found', loadChildren: () => import('./views/page-not-found-component/page-not-found.module').then(module => module.PageNotFoundModule) },
  { path: '**', redirectTo: 'page-not-found', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule],
})
export class AppRoutingModule { }
