import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HTTP_INTERCEPTORS } from "@angular/common/http";

import { MaterialModules } from "src/app/material-modules";
import { FilterModule } from "src/app/components/filter/filter.module";
import { SharedComponentsModule } from "src/app/components/shared-components.module";

import { AuthGuard } from "./auth/auth.guard";

import { HeaderManagementComponent } from "./component/header-management/header-management.component";
import { SigninComponent } from './signin/signin.component';
import { ManagementComponent } from "./management.component";
import { AccountsComponent } from './views/accounts/accounts.component';
import { RequestComponent } from './views/request/request.component';
import { EventsComponent } from './views/events/events.component';
import { TransfersComponent } from './views/transfers/transfers.component';
import { LayoutComponent } from "./component/layout/layout.component";
import { OperationsComponent } from "./views/operations/operations.component";
import { AlertsComponent } from "./views/alerts/alerts.component";
import { LogOutComponent } from './views/log-out/log-out.component';
import { NewUserComponent } from './views/new-user/new-user.component';
import { DeleteUserComponent } from './views/delete-user/delete-user.component';


const routes: Routes = [
  {
    path: '', component: SigninComponent
  },
  {
    path: '', component: ManagementComponent,
    children: [
      { path: 'operations', component: OperationsComponent, canActivate: [AuthGuard]},
      { path: 'requests', component: RequestComponent, canActivate: [AuthGuard]},
      { path: 'accounts', component: AccountsComponent, canActivate: [AuthGuard]},
      { path: 'events', component: EventsComponent, canActivate: [AuthGuard]},
      { path: 'transfers', component: TransfersComponent, canActivate: [AuthGuard]},
      { path: 'alerts', component: AlertsComponent, canActivate: [AuthGuard]},
    ]
  }
];

@NgModule({
  declarations: [
    ManagementComponent,
    SigninComponent,
    AccountsComponent,
    RequestComponent,
    EventsComponent,
    TransfersComponent,
    HeaderManagementComponent,
    LayoutComponent,
    OperationsComponent,
    AlertsComponent,
    LogOutComponent,
    NewUserComponent,
    DeleteUserComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    MaterialModules,
    FilterModule,
    SharedComponentsModule
  ],
  exports: [
    HeaderManagementComponent,
  ],
    // providers: [{
    //   provide: HttpClient,
    //   useClass: HttpClient
    // }, {
    //   provide: HttpHandler,
    //   useClass: ɵHttpInterceptingHandler
    // }, {
    //   provide: HTTP_INTERCEPTORS,
    //   deps: [Injector],
    //   useFactory: injector => [
    //     ...ARRAY_OF_CHILDREN_INTERCEPTOR,
    //     ...injector.parent.get(HTTP_INTERCEPTORS)
    //   ]
    // }]
  // providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true}]
})

export class ManagementModule { }
