import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { FinanceService } from '../../utils/finance.service';
import { Crypto, CryptoPaginated, Tickers, TickersPaginated } from '../../utils/model';
@Component({
  selector: 'ngx-finance-admin-menu',
  templateUrl: './admin-menu.component.html',
  styleUrls: ['./admin-menu.component.scss'],
})
export class AdminMenuComponent implements OnInit {

  allTickers: TickersPaginated;
  activeTicker: Tickers;
  allCrypto: CryptoPaginated;
  activeCrypto: Crypto;
  numberShow = 10;
  page = 1;
  size = 7;
  constructor(private adminService: AdminService,
              private financeService: FinanceService) { }

  ngOnInit(): void {
    this.init();
    this.initActiveModels();
  }

  initActiveModels() {
    this.activeCrypto = {
      id: '',
      name:  '',
      symbol: '',
      slug:  '',
      status:  '',
      platform: '',
    };
    this.activeTicker = {
      name: '',
      code: '',
    };
  }

  init() {
    this.financeService.getListTickers(this.page, this.size).subscribe( (x: TickersPaginated) => {
      this.allTickers = x;
    });

    this.financeService.getListCrypto(this.page, this.size).subscribe( (x: CryptoPaginated) => {
      this.allCrypto = x;
    });
  }
  Paginate(direction: string) {

    if (direction === 'right') {
      this.page++;
      this.init();
    }

    if (direction === 'left') {
      if (this.page > 0 ) {
        this.page--;
      }
      this.init();
    }
  }


  onDeleteConfirm(event): void { // TODO ADD ITEM TO DELETE HERE
    console.log(event);
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  setActiveStock(item: Tickers) {
    this.activeTicker = item;
  }
  setActiveCrypto(item: Crypto) {
    this.activeCrypto = item;
  }

  submitTicker() { // TODO ADD ITEM HERE
    this.adminService.postNewStock().subscribe( (x: any) => {
      console.log(x);
      this.initActiveModels();
    });
  }
}
