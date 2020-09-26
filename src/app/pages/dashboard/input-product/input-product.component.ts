import { Component, OnInit } from '@angular/core';
import {SelectedTickers, Tickers, TickersPaginated} from 'app/pages/utils/model';
import {FinanceService} from '../../utils/finance.service';
import {Router} from '@angular/router';

@Component({
  selector: 'ngx-input-product',
  templateUrl: './input-product.component.html',
  styleUrls: ['./input-product.component.scss'],
})
export class InputProductComponent implements OnInit {

  listTickers: Tickers[] = null;
  page = 1;
  size = 10;
  selectedTickers: SelectedTickers[] = [];
  query: any;
  numberShow = 10;
  constructor(private service: FinanceService,
              private router: Router) { }


  removeItem(item: SelectedTickers) {
    const index: number = this.selectedTickers.indexOf(item);
    if (index !== -1) {
      this.selectedTickers.splice(index, 1);
    }
  }

  getTickersList() {
    this.service.getListTickers(this.page, this.size).subscribe( (x: TickersPaginated) => {
      this.listTickers = x.content;
    });
  }

  search() {
    if (this.query.length >= 3) {
      this.service.searchStr(this.query).subscribe( (x: Tickers[]) => { this.listTickers = x; });

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
  incrementSplice() {
    this.numberShow += 10;
  }
  addItem(item: Tickers) {
    if ( this.selectedTickers === null ) {
      this.loadPrice(item);
      this.selectedTickers = [];
      this.selectedTickers.push( ... [{
        name: item.name,
        code: item.code,
        maxThreshold: 0,
        minThreshold: 0,
        price: 0,
      }]);
    }

    if (!this.selectedTickers.some(e => e.code === item.code)) {
      this.loadPrice(item);

      this.selectedTickers.push( ... [{
        name: item.name,
        code: item.code,
        maxThreshold: 0,
        minThreshold: 0,
        price: 0,
      }]);
    }

  }

  loadPrice(item: Tickers) {
    this.service.loadSinglePrince(item.code).subscribe( (x: number) => {
       this.selectedTickers.forEach( value => {
        if (value.code === item.code) {
          value.price = x;
        }
      });
    });
  }
  setSelectedTickersAndValidate() {
    localStorage.setItem('selectedItems', JSON.stringify(this.selectedTickers));
    this.router.navigateByUrl('/home');
  }

  getSelectedTickers() {
    this.selectedTickers = JSON.parse(localStorage.getItem('selectedItems' )) as SelectedTickers[];
  }

  ngOnInit(): void {
    this.getTickersList();
    this.getSelectedTickers();

  }

}
