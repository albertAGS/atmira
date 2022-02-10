import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GetResponseService } from 'src/app/services/get-response.service';

@Component({
  selector: 'app-success-response',
  templateUrl: './success-response.component.html',
  styleUrls: ['./success-response.component.scss']
})
export class SuccessResponseComponent implements OnInit {

  constructor(private router: Router, private activateRoute: ActivatedRoute, private gr: GetResponseService) { }

  ngOnInit(): void {
    this.activateRoute.params.subscribe(d => {
      this.getParamsUrlAndGoToURL(d.id);
    });
  }

  getParamsUrlAndGoToURL = (id) => {
    const url = window.location.href;
    if (!url.includes('code')) {
      return;
    }
    let aux = url.split('?code=')[1];
    const code = aux.split('&state')[0];
    const state = aux.split('&state=')[1];
    this.gr.getResponse('OAuth/CreatePayAS/', id, code, state).subscribe((d: any) => {
      window.open(d._links.scaRedirect.href, '_self');
    });
  }

}
