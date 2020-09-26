import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { takeWhile } from 'rxjs/operators';

import { OrdersChartComponent } from './charts/orders-chart.component';
import { ProfitChartComponent } from './charts/profit-chart.component';
import { OrdersChart } from '../../../@core/data/orders-chart';
import { ProfitChart } from '../../../@core/data/profit-chart';
import { OrderProfitChartSummary, OrdersProfitChartData } from '../../../@core/data/orders-profit-chart';
import {SelectedTickers, Tickers, TickersPaginated} from '../../utils/model';
import {FinanceService} from '../../utils/finance.service';

@Component({
  selector: 'ngx-ecommerce-charts',
  styleUrls: ['./charts-panel.component.scss'],
  templateUrl: './charts-panel.component.html',
})
export class ECommerceChartsPanelComponent implements OnDestroy, OnInit {

  private alive = true;

  chartPanelSummary: OrderProfitChartSummary[];
  period: string = 'week';
  ordersChartData: OrdersChart;
  profitChartData: ProfitChart;
  listTickers: Tickers[] = null;
  page = 1;
  size = 10;
  selectedTickers: SelectedTickers[] = [];
  query: any;
  numberShow = 10;

  @ViewChild('ordersChart', { static: true }) ordersChart: OrdersChartComponent;
  @ViewChild('profitChart', { static: true }) profitChart: ProfitChartComponent;

  constructor(private ordersProfitChartService: OrdersProfitChartData,
              private service: FinanceService) {
    this.ordersProfitChartService.getOrderProfitChartSummary()
      .pipe(takeWhile(() => this.alive))
      .subscribe((summary) => {
        this.chartPanelSummary = summary;
      });

    this.getOrdersChartData(this.period);
    this.getProfitChartData(this.period);
  }


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

  getSelectedTickers() {
    this.selectedTickers = JSON.parse(localStorage.getItem('selectedItems' )) as SelectedTickers[];
  }

  ngOnInit(): void {
    this.getTickersList();
    this.getSelectedTickers();

  }

  setPeriodAndGetChartData(value: string): void {
    if (this.period !== value) {
      this.period = value;
    }

    this.getOrdersChartData(value);
    this.getProfitChartData(value);
  }

  changeTab(selectedTab) {
    if (selectedTab.tabTitle === 'Stock') {
      this.profitChart.resizeChart();
    } else {
      this.ordersChart.resizeChart();
    }
  }

  getOrdersChartData(period: string) {
    this.ordersProfitChartService.getOrdersChartData(period)
      .pipe(takeWhile(() => this.alive))
      .subscribe(ordersChartData => {
        this.ordersChartData = ordersChartData;
      });
  }

  getProfitChartData(period: string) {
    this.ordersProfitChartService.getProfitChartData(period)
      .pipe(takeWhile(() => this.alive))
      .subscribe(profitChartData => {
        this.profitChartData = profitChartData;
      });
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
