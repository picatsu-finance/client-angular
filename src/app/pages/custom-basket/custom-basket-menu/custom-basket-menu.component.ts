import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { element } from 'protractor';
import { of } from 'rxjs';
import { forkJoin } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CustomBasketService } from './custombasket.service';

@Component({
  selector: 'ngx-custom-basket-menu',
  templateUrl: 'custom-basket-menu.component.html',
  styleUrls: ['custom-basket-menu.component.scss'],
})
export class CustomBasketMenuComponent implements OnInit {
  data: any[] = [];
  isLoading = true;
  settings = {
    actions: false,

    pager: {
      display: true,
      perPage: 100,
    },
    columns: {
      Société: {
        title: 'Société',
      },
      DateDeDétachement: {
        title: 'Date De Détachement',
        filter: {
          type: 'daterange',
          config: {
            daterange: {
              format: 'mm/dd/yyyy',
            },
          },
        },
      },
      DateDePaiement: {
        title: 'Date De Paiement',
        filter: {
          type: 'daterange',
          config: {
            daterange: {
              format: 'mm/dd/yyyy',
            },
          },
        },
      },
      Dividende: {
        title: 'Dividende',
      },
      prix: {
        title: 'Prix',
      },
      rendement: {
        title: 'rentabilite en %',
      },
      TypeDeDividende: {
        title: 'Type',
      },
      Exercice: {
        title: 'Exercice',
      },
    },
  };
  constructor(private _service: CustomBasketService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this._service.getAllDididendes().subscribe((res) => {
      // @ts-ignore
      this.data = res;
      this.isLoading = false;
    });
  }
}
