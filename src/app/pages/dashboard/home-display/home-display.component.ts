import {Component, OnDestroy, OnInit} from '@angular/core';
import {NbDialogService, NbThemeService} from '@nebular/theme';
import { takeWhile } from 'rxjs/operators';

import { UserActivityData, UserActive } from '../../../@core/data/user-activity';
import {FinanceService} from '../../utils/finance.service';
import {Crypto, CryptoPaginated, CryptoPrices, SelectedTickers, Tickers, TickersPaginated} from '../../utils/model';
import {ShowcaseDialogComponent} from '../../custom-basket/dialog/showcase-dialog/showcase-dialog.component';

@Component({
  selector: 'ngx-home-display',
  styleUrls: ['./home-display.component.scss'],
  templateUrl: './home-display.component.html',
})
export class HomeDisplayComponent implements OnDestroy, OnInit {

  private alive = true;

  userActivity: UserActive[] = [];
  type = 'stock';
  types = ['stock', 'crypto', 'forex', 'option'];
  currentTheme: string;
  query: any;
  numberShow = 10;
  page = 1;
  size = 10;
  listTickers: Tickers[] = null;
  listCrypto: Crypto[] = null;
  selectedTickers: SelectedTickers[] = [];
  public shoudRefreshTable: boolean;
  constructor(private themeService: NbThemeService,
              private service: FinanceService,
              private dialogService: NbDialogService,
              private userActivityService: UserActivityData) {
    this.themeService.getJsTheme()
      .pipe(takeWhile(() => this.alive))
      .subscribe(theme => {
        this.currentTheme = theme.name;
    });

    this.getUserActivity(this.type);
  }


  getSelectedTickers() {
    this.selectedTickers = this.service.getSelectedTickers();
    this.selectedTickers.forEach(x => {
      if ( x.type === 'stock') {
        this.service.loadSingleStockPrice(x.code).subscribe((value: number) => {
          x.price = value;
        });
      }

      if ( x.type === 'crypto') {
        this.service.loadSingleCryptoPrice(x.code, 'USD').subscribe((value: CryptoPrices) => {
          x.price = value.quoteResponse.result[0].regularMarketPrice;
        });
      }
    });
  }
  refresh(type: string) {
    this.query = '';
    if ( type === 'stock') {

      this.getTickersList();
    }
    if ( type === 'crypto') {
      this.getCryptoList();
    }
  }

  getUserActivity(period: string) {
    this.userActivityService.getUserActivityData(period)
      .pipe(takeWhile(() => this.alive))
      .subscribe(userActivityData => {
        this.userActivity = userActivityData;
      });
  }

  ngOnDestroy() {
    this.alive = false;
  }

  ngOnInit(): void {
    this.getCryptoList();
    this.getTickersList();
    this.getSelectedTickers();
    this.service.getValue().subscribe((value) => {
      if ( value ) {
        this.getSelectedTickers();
      }
      this.shoudRefreshTable = value;
    });
  }


  openStock(item: any, type: string) {
    console.log(item);
    // @ts-ignore
    this.dialogService.open(ShowcaseDialogComponent, {
      context: {
        value: item,
        type: type,
      },
    });

    this.getSelectedTickers();
  }

  openCrypto(item: any, type: string) {
    console.log(item);
    // @ts-ignore
    this.dialogService.open(ShowcaseDialogComponent, {
      context: {
        value:  {
          name: item.name,
          code: item.symbol,
        },
        type: type,
      },
    });

    this.getSelectedTickers();
  }
  removeItem(item: SelectedTickers) {
    const index: number = this.selectedTickers.indexOf(item);
    if (index !== -1) {
      this.selectedTickers.splice(index, 1);
    }
    this.service.setSelectedTickersAndValidate(this.selectedTickers);
  }

  getTickersList() {
    this.service.getListTickers(this.page, this.size).subscribe( (x: TickersPaginated) => {
      this.listTickers = x.content;
    });
  }

  getCryptoList() {
    this.service.getListCrypto(this.page, this.size).subscribe( (x: CryptoPaginated) => {
      this.listCrypto = x.content;
    });
  }

  search() {
    if (this.query.length >= 3) {
      this.service.searchStr(this.query).subscribe( (x: Tickers[]) => { this.listTickers = x; });

    }
  }

  searchCrypto() {
    if (this.query.length >= 3) {
      this.service.searchCryptoStr(this.query).subscribe( (x: Crypto[]) => { this.listCrypto = x; });

    }
  }

  Paginate(direction: string) {

    if (direction === 'right') {
      this.page++;
      this.getTickersList();
    }

    if (direction === 'left') {
      if (this.page > 0 ) {
        this.page--;
      }
      this.getTickersList();
    }
  }

  PaginateCrypto(direction: string) {

    if (direction === 'right') {
      this.page++;
      this.getCryptoList();
    }

    if (direction === 'left') {
      if (this.page > 0 ) {
        this.page--;
      }
      this.getCryptoList();
    }
  }

  incrementSplice() {
    this.numberShow += 10;
  }
  loadPrice(item: Tickers) {
    this.service.loadSingleStockPrice(item.code).subscribe( (x: number) => {
      this.selectedTickers.forEach( value => {
        if (value.code === item.code) {
          value.price = x;
        }
      });
    });
  }
  setSelectedTickersAndValidate() {
    this.service.setSelectedTickersAndValidate(this.selectedTickers);
  }
}
