import { Component, OnInit, ViewChild } from '@angular/core';
import { FinanceService } from '../../utils/finance.service';
import { NbThemeService } from '@nebular/theme';
import { Tickers } from '../../utils/model';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexYAxis,
  ApexXAxis,
  ApexPlotOptions,
  ApexDataLabels,
  ApexStroke
} from "ng-apexcharts";

import { seriesData, seriesDataLinear } from './ohic';

@Component({
  selector: 'ngx-stocks-menu',
  templateUrl: 'stocks-menu.component.html',
  styleUrls: ['stocks-menu.component.scss'],
})
export class StocksMenuComponent implements OnInit {

  from: Tickers = {
    code: 'bnp.pa',
    name: 'bnp paribas'
  };
  stockList: Tickers[];
  isLoading = false;
  response: any;
  data: {};
  options: any;
  themeSubscription: any;
  colors: any;
  chartjs: any;
  month = 10;
  ///
  @ViewChild("chart") chart: ChartComponent;
  public chartCandleOptions: Partial<ChartOptions>;
  public chartBarOptions: Partial<ChartOptions>;
  private themeChart: any;
  activeTheme: string = 'dark';

  constructor(private service: FinanceService,
              private theme: NbThemeService) {
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

      this.colors = config.variables;
      this.chartjs  = config.variables.chartjs;
    });


    this.service.activeTheme.subscribe((value) => {
      this.activeTheme = value;
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
              labelString: this.from.name + ' - ' + this.from.code,
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



    this.chartCandleOptions = {
      series: [
        {
          name: "candle",
          data: seriesData
        }
      ],
      chart: {
        type: "candlestick",
        height: 290,
        id: "candles",
        toolbar: {
          autoSelected: "pan",
          show: false
        },
        zoom: {
          enabled: false
        }
      },
      plotOptions: {
        candlestick: {
          colors: {
            upward: "#3C90EB",
            downward: "#DF7D46"
          }
        }
      },
      xaxis: {
        type: "datetime"
      }
    };

    this.chartBarOptions = {
      series: [
        {
          name: "volume",
          data: seriesDataLinear
        }
      ],
      chart: {
        height: 160,
        type: "bar",
        brush: {
          enabled: true,
          target: "candles"
        },
        selection: {
          enabled: true,
          xaxis: {
            min: new Date("20 Jan 2017").getTime(),
            max: new Date("10 Dec 2017").getTime()
          },
          fill: {
            color: "#ccc",
            opacity: 0.4
          },
          stroke: {
            color: "#0D47A1"
          }
        }
      },
      dataLabels: {
        enabled: false
      },
      plotOptions: {
        bar: {
          columnWidth: "80%",
          colors: {
            ranges: [
              {
                from: -1000,
                to: 0,
                color: "#F15B46"
              },
              {
                from: 1,
                to: 10000,
                color: "#FEB019"
              }
            ]
          }
        }
      },
      stroke: {
        width: 0
      },
      xaxis: {
        type: "datetime",
        axisBorder: {
          offsetX: 13
        }
      },
      yaxis: {
        labels: {
          show: false
        }
      }
    };
  }


  ngOnInit() {
    this.initList();
    this.getHistory();
  }

  buildLabel(date: Date) {
    return date.getMonth() + '/' + date.getDay() + ' ' + date.getHours()+ ':' + date.getMinutes();
  }

  getHistory() {

    this.isLoading = true;
    this.service.getStockHistory(this.from.code).subscribe( res => {

      const labels = [];
      // @ts-ignore
      res.chart.result[0].timestamp.slice(0, this.month).forEach( element => {
        labels.push( this.buildLabel(new Date(element * 1000 ) )   );
      });
      this.data = {
        // @ts-ignore
        labels: labels,

        datasets: [{
          label: 'Open',
          // @ts-ignore
          data: res.chart.result[0].indicators.quote[0].open.slice(0,this.month),
          borderColor: this.colors.primary,
          backgroundColor: this.colors.primary,
          fill: false,
          borderDash: [5, 5],
          pointRadius: 4,
          pointHoverRadius: 10,
        }, {
          label: 'High',
          // @ts-ignore
          data: res.chart.result[0].indicators.quote[0].high.slice(0,this.month),
          borderColor: this.colors.dangerLight,
          backgroundColor: this.colors.dangerLight,
          fill: false,
          borderDash: [5, 5],
          pointRadius: 4,
          pointHoverRadius: 10,
        }, {
          label: 'Closed',
          // @ts-ignore
          data: res.chart.result[0].indicators.quote[0].close.slice(0,this.month),
          borderColor: this.colors.info,
          backgroundColor: this.colors.info,
          fill: false,
          pointRadius: 4,
          pointHoverRadius: 10,
        }, {
          label: 'Low',
          // @ts-ignore
          data: res.chart.result[0].indicators.quote[0].low.slice(0,this.month),
          borderColor: this.colors.success,
          backgroundColor: this.colors.success,
          fill: false,
          pointRadius: 4,
          pointHoverRadius: 10,
        }],
      };



      this.isLoading = false;

    });
  }


  initList() {
    this.service.getAllStockList().subscribe( (res: Tickers[])=> {
      this.stockList = res;
    });
  }

}

export interface ChartOptions {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  plotOptions: ApexPlotOptions;
  dataLabels: ApexDataLabels;
  stroke: ApexStroke;
}
