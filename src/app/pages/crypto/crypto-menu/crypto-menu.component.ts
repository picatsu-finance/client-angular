import { Component, OnInit } from '@angular/core';
import { FinanceService } from '../../utils/finance.service';
import { NbThemeService } from '@nebular/theme';
import { Crypto } from '../../utils/model';

@Component({
  selector: 'ngx-crypto-menu',
  styleUrls: ['./crypto-menu.component.scss'],
  templateUrl: './crypto-menu.component.html',
})
export class CryptoMenuComponent implements OnInit{

  cryptoList: Crypto[];
  data: {};
  options: any;
  themeSubscription: any;
  colors: any;
  chartjs: any;
  from: Crypto = {
    symbol: 'BTC',
    name: 'Bitcoin',
    slug: 'Bitcoin',
    id: '1',
    status: 'active',
    platform: null,
  };
  response: any;
  isLoading = false;
  constructor(private service: FinanceService,
              private theme: NbThemeService) {
  this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
    this.colors = config.variables;
    this.chartjs  = config.variables.chartjs;
  });
  this.options = {
    responsive: true,
    maintainAspectRatio: false,
    legend: {
      position: 'bottom',
      labels: {
        fontColor: this.chartjs.textColor,
      },
    },
    hover: {
      mode: 'index',
    },
    scales: {
      xAxes: [
        {
          display: true,
          scaleLabel: {
            display: true,
            labelString: 'Month',
          },
          gridLines: {
            display: true,
            color: this.chartjs.axisLineColor,
          },
          ticks: {
            fontColor: this.chartjs.textColor,
          },
        },
      ],
      yAxes: [
        {
          display: true,
          scaleLabel: {
            display: true,
            labelString: 'Value',
          },
          gridLines: {
            display: true,
            color: this.chartjs.axisLineColor,
          },
          ticks: {
            fontColor: this.chartjs.textColor,
          },
        },
      ],
    },
  };
  }

  ngOnInit(): void {
    this.getAllList();
    this.getSpecificValue();
  }

  getSpecificValue() {
    this.isLoading = true;
    this.service.getCryptoDetails(this.from.symbol, 'USD').subscribe(res => {
      this.response = res;
      console.log('value : ', this.colors);

      this.data = {
       labels: ['Regular Market Day'],
        datasets: [{
          label: 'Regular Market Day High',
          // @ts-ignore
          data: [res.quoteResponse.result[0].regularMarketDayHigh],
          backgroundColor: '#2980B9',
          borderWidth: 1,
        },
          {
            label: 'Regular Market Day Low',
            // @ts-ignore
            data: [res.quoteResponse.result[0].regularMarketDayLow  ],
            backgroundColor: '#3498DB',
            borderWidth: 1,
          },
          {
          label: '52 weeks High',
            // @ts-ignore
          data:  [res.quoteResponse.result[0].fiftyTwoWeekHigh ],
          backgroundColor:  '#8E44AD',
          borderWidth: 1,
        },
          {
            label: '52 weeks Low',
            // @ts-ignore
            data:  [res.quoteResponse.result[0].fiftyTwoWeekLow  ],
            backgroundColor: '#AF7AC5',
            borderWidth: 1,
          },
          {
            label: '50 days average',
            // @ts-ignore
            data:  [res.quoteResponse.result[0].fiftyDayAverage ],
            backgroundColor:  '#145A32',
            borderWidth: 1,
          },
          {
            label: '200 days average',
            // @ts-ignore
            data:  [res.quoteResponse.result[0].twoHundredDayAverage  ],
            backgroundColor: '#ABEBC6',
            borderWidth: 1,
          }/*
          {
          label: 'Closed',
          data: chartvalues.close,
          borderColor: this.colors.info,
          backgroundColor: this.colors.info,
          fill: false,
          pointRadius: 4,
          pointHoverRadius: 10,
        },
          {
          label: 'Low',
          data: chartvalues.low,
          borderColor: this.colors.success,
          backgroundColor: this.colors.success,
          fill: false,
          pointRadius: 4,
          pointHoverRadius: 10,
        }*/],
      };
      this.isLoading = false;
    });
  }

  getAllList() {
    this.isLoading = true;
    this.service.getAllCrypto().subscribe( (val: Crypto[]) => {
      this.cryptoList = val;
      this.isLoading = false;
    });
  }
}
