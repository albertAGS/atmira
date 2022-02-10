import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Injectable, Injector } from "@angular/core"
import { MatDialog } from '@angular/material/dialog';
import { Observable, of } from "rxjs";
import { tap, catchError } from "rxjs/operators";
import { ErrorAlertModalComponent } from './components/error-alert/error-alert.component';
import { ErrorAlertService } from './components/error-alert/error-alert.service';
@Injectable({ providedIn: 'root' })
export class AppHttpInterceptor implements HttpInterceptor {

    constructor(
        private dialog: MatDialog
    ) { }

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        // const auth = this.injector.get(ErrorAlertService);

        return next.handle(req).pipe(
            tap(evt => {
                if (req.url.includes('http') && evt instanceof HttpResponse) {
                    if (evt.body) {
                        if (!evt.body.Ok) {
                            if (evt.body.ResGenerica && evt.body.ResGenerica.Ok) {
                                return;
                            }
                            console.log(req)
                            const dialogRef = this.dialog.open(ErrorAlertModalComponent, {
                                width: '250px',
                                data: {
                                    text: evt.body.Message || 'Se ha producido un error inesperado',
                                    title: 'Error'
                                },
                            });

                            dialogRef.afterClosed().subscribe(result => {
                                if (req.body.Callback_KO && !window.location.href.includes('marketplace')) {
                                    window.location.href = req.body.Callback_KO;
                                }
                            });
                            console.log('ERROR')
                            return of('Error')
                        }
                    }
                }
            }),
            catchError((err: any) => {
                if (err instanceof HttpErrorResponse) {
                    try {
                        console.log('errr');
                    } catch (e) {
                        console.log('err');
                    }
                }
                return of(err);
            }));

    }

}