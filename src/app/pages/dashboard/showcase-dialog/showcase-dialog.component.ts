import { X } from '@angular/cdk/keycodes';
import {Component, Input, OnInit} from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import {FinanceService} from '../../utils/finance.service';
import {CryptoPrices, SelectedTickers, Tickers} from '../../utils/model';
import { AuthenticationService } from '../../auth/_helpers/authentication.service';

@Component({
  selector: 'ngx-showcase-dialog',
  templateUrl: 'showcase-dialog.component.html',
  styleUrls: ['showcase-dialog.component.scss'],
})
export class ShowcaseDialogComponent implements OnInit {

  @Input() value: Tickers;
  @Input() type: string;
  quantity: number = 1;
  selectedTickers: SelectedTickers[] = [];
  blancSelectedTickers: SelectedTickers;

  constructor(private service: FinanceService,
              protected ref: NbDialogRef<ShowcaseDialogComponent>,
              private auth: AuthenticationService) {
  }

  dismiss() {
    this.ref.close();
  }

  validate() {
    if (this.selectedTickers === null) {
      this.selectedTickers = [];
    }
    if ( this.auth.currentUserValue) {
      this.blancSelectedTickers.userId = this.auth.currentUserValue.id;
    }

    this.blancSelectedTickers.quantity = this.quantity;
    this.selectedTickers.push(... [this.blancSelectedTickers]);
    this.service.setSelectedTickersAndValidate(this.selectedTickers);
    this.service.setValue(true);
    this.ref.close();
  }

  ngOnInit() {
    this.selectedTickers = this.service.getSelectedTickers();
    console.log(this.type + this.value);
    if ( this.type === 'stock' ) {
      this.loadStock();
    }
    if ( this.type === 'crypto') {
      this.loadCrypto();
    }
    if ( this.type === 'forex') {
      this.loadForex();
    }
    console.log(this.type + this.value);
  }

  loadStock() {

    this.service.loadSingleStockPrice(this.value.code).subscribe( (x: number) => {
      this.blancSelectedTickers = {
        userId: null,
        buyPrice: x,
        name: this.value.name,
        code: this.value.code,
        maxThreshold: x,
        minThreshold: x,
        price: x,
        type: this.type,
        quantity: this.quantity,
        description: this.value.name,
      };
    });
  }

  loadCrypto() {

    this.service.loadSingleCryptoPrice(this.value.code, 'USD').subscribe( (x: CryptoPrices) => {
      this.blancSelectedTickers = {
        userId: null,
        buyPrice: x.quoteResponse.result[0].regularMarketPrice,
        name: this.value.name,
        code: this.value.code,
        maxThreshold: x.quoteResponse.result[0].regularMarketPrice,
        minThreshold: x.quoteResponse.result[0].regularMarketPrice,
        price: x.quoteResponse.result[0].regularMarketPrice,
        type: this.type,
        quantity: this.quantity,
        description: this.value.name,
      };
    });
  }

  loadForex() {

    this.service.loadSingleForexPrice(this.value.code, 'USD').subscribe( (x: any) => {
      this.blancSelectedTickers = {
        userId: null,
        buyPrice: x.exchangeRate,
        name: this.value.name,
        code: this.value.code,
        maxThreshold: x.exchangeRate,
        minThreshold: x.exchangeRate,
        price: x.exchangeRate,
        type: this.type,
        quantity: this.quantity,
        description: this.value.name,
      };
    });
  }
}
