import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { NbComponentStatus, NbDialogService, NbThemeService, NbToastrService } from '@nebular/theme';
import { takeWhile } from 'rxjs/operators';

import { FinanceService } from '../../utils/finance.service';
import {
  Crypto,
  CryptoPaginated,
  CryptoPrices,
  ForexModel,
  ForexModelPaginated,
  SelectedTickers,
  Tickers,
  TickersPaginated,
} from '../../utils/model';
import { ShowcaseDialogComponent } from '../showcase-dialog/showcase-dialog.component';
import { NbToastrConfig } from '@nebular/theme/components/toastr/toastr-config';
import { environment } from 'environments/environment';

@Component({
  selector: 'ngx-home-display',
  styleUrls: ['./home-display.component.scss'],
  templateUrl: './home-display.component.html',
})
export class HomeDisplayComponent implements OnDestroy, OnInit {
  @HostBinding('class')
  classes = 'example-items-rows';
  display: boolean = false;
  private alive = true;
  type = 'stock';
  types = ['stock', 'crypto', 'forex', 'option'];
  currentTheme: string;
  query: any;
  numberShow = 10;
  page = 1;
  size = 10;
  listTickers: Tickers[] = null;
  listCrypto: Crypto[] = null;
  listForex: ForexModel[] = null;
  selectedTickers: SelectedTickers[] = [];
  public shoudRefreshTable: boolean;
  constructor(
    private themeService: NbThemeService,
    private service: FinanceService,
    private dialogService: NbDialogService,
    private toastrService: NbToastrService
  ) {
    this.themeService
      .getJsTheme()
      .pipe(takeWhile(() => this.alive))
      .subscribe((theme) => {
        this.currentTheme = theme.name;
      });
    this.retrieveSavedValues();
    if (environment.production) {
      setInterval(() => {
        this.retrieveSavedValues();
      }, 3000000);
    }
  }

  ngOnDestroy() {
    this.alive = false;
  }

  ngOnInit(): void {
    this.getCryptoList();
    this.getTickersList();
    this.getForexList();
    this.retrieveSavedValues();
    this.service.getValue().subscribe((value) => {
      if (value) {
        this.retrieveSavedValues();
      }
      this.shoudRefreshTable = value;
    });
  }

  showToast(status: NbComponentStatus, messsage: string, code: string) {
    this.toastrService.show(messsage, `Check: ${code}`, {
      status: status,
      position: 'bottom-end',
      duration: 10000,
    } as NbToastrConfig);
  }
  selectWichToaster(value: number, maxthreshold: number, minTreshold: number, code: string) {
    if (value <= minTreshold) {
      this.showToast('danger', 'Think about it man ! ', code);
    }
    if (value >= maxthreshold) {
      this.showToast('success', 'You can sell ;) ', code);
    }
  }
  retrieveSavedValues() {
    this.selectedTickers = this.service.getSelectedTickers();
    this.selectedTickers.forEach((x) => {
      if (x.type === 'stock') {
        this.service.loadSingleStockPrice(x.code).subscribe((value: number) => {
          this.selectWichToaster(value, x.maxThreshold, x.minThreshold, x.code);
          x.price = value;
        });
      }

      if (x.type === 'crypto') {
        this.service.loadSingleCryptoPrice(x.code, 'USD').subscribe((value: CryptoPrices) => {
          this.selectWichToaster(
            value.quoteResponse.result[0].regularMarketPrice,
            x.maxThreshold,
            x.minThreshold,
            x.code
          );
          x.price = value.quoteResponse.result[0].regularMarketPrice;
        });
      }

      if (x.type === 'forex') {
        this.service.loadSingleForexPrice(x.code, 'USD').subscribe((value: any) => {
          this.selectWichToaster(value.exchangeRate, x.maxThreshold, x.minThreshold, x.code);
          x.price = value.exchangeRate;
        });
      }
    });
  }

  refresh(type: string) {
    this.query = '';
    if (type === 'stock') {
      this.getTickersList();
    }
    if (type === 'crypto') {
      this.getCryptoList();
    }
    if (type === 'forex') {
      this.getForexList();
    }
  }

  ////////////////////// OPEN POP UP

  openStock(item: any, type: string) {
    // @ts-ignore
    this.dialogService.open(ShowcaseDialogComponent, {
      context: {
        value: item,
        type: type,
      },
    });

    this.retrieveSavedValues();
  }

  openCrypto(item: any, type: string) {
    // @ts-ignore
    this.dialogService.open(ShowcaseDialogComponent, {
      context: {
        value: {
          name: item.name,
          code: item.symbol,
        },
        type: type,
      },
    });

    this.retrieveSavedValues();
  }

  openForex(item: any, type: string) {
    // @ts-ignore

    this.dialogService.open(ShowcaseDialogComponent, {
      context: {
        value: {
          name: item.name,
          code: item.code,
        },
        type: type,
      },
    });

    this.retrieveSavedValues();
  }

  ////////////////////// GET ITEMS List

  getTickersList() {
    this.service.getListTickers(this.page, this.size).subscribe((x: TickersPaginated) => {
      this.listTickers = x.content;
    });
  }

  getCryptoList() {
    this.service.getListCrypto(this.page, this.size).subscribe((x: CryptoPaginated) => {
      this.listCrypto = x.content;
    });
  }

  getForexList() {
    this.service.getListForex(this.page, this.size).subscribe((x: ForexModelPaginated) => {
      this.listForex = x.content;
    });
  }

  ////////////////////// SEARCH ITEMS

  search() {
    if (this.query.length >= 3) {
      this.service.searchStr(this.query).subscribe((x: Tickers[]) => {
        this.listTickers = x;
      });
    }
  }

  searchCrypto() {
    if (this.query.length >= 3) {
      this.service.searchCryptoStr(this.query).subscribe((x: Crypto[]) => {
        this.listCrypto = x;
      });
    }
  }

  searchForex() {
    if (this.query.length >= 3) {
      this.service.searchForexStr(this.query).subscribe((x: ForexModel[]) => {
        this.listForex = x;
      });
    }
  }

  ////////////////////// PAGINATE ITEMS

  Paginate(direction: string) {
    if (direction === 'right') {
      this.page++;
      this.getTickersList();
    }

    if (direction === 'left') {
      if (this.page > 0) {
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
      if (this.page > 0) {
        this.page--;
      }
      this.getCryptoList();
    }
  }

  PaginateForex(direction: string) {
    if (direction === 'right') {
      this.page++;
      this.getForexList();
    }

    if (direction === 'left') {
      if (this.page > 0) {
        this.page--;
      }
      this.getForexList();
    }
  }
  incrementSplice() {
    this.numberShow += 10;
  }

  ////////////////////// OTHERS

  loadPrice(item: Tickers) {
    this.service.loadSingleStockPrice(item.code).subscribe((x: number) => {
      this.selectedTickers.forEach((value) => {
        if (value.code === item.code) {
          value.price = x;
        }
      });
    });
  }
  setSelectedTickersAndValidate() {
    this.service.setSelectedTickersAndValidate(this.selectedTickers);
  }

  removeItem(item: SelectedTickers) {
    const index: number = this.selectedTickers.indexOf(item);
    if (index !== -1) {
      this.selectedTickers.splice(index, 1);
    }
    this.service.setSelectedTickersAndValidate(this.selectedTickers);
  }

  getGain(item: SelectedTickers) {
    return (item.price * item.quantity - item.buyPrice * item.quantity).toFixed(3);
  }
}
