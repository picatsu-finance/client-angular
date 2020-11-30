import { Component, OnInit } from '@angular/core';
import { FinanceService } from '../../utils/finance.service';
import { DailyForex, ForexModel } from '../../utils/model';
import { forkJoin } from 'rxjs';
import { NbThemeService } from '@nebular/theme';
import { lab } from 'd3-color';

@Component({
  selector: 'ngx-forex-menu-component',
  styleUrls: ['./forex-menu.component.scss'],
  templateUrl: './forex-menu.component.html',
})
export class ForexMenuComponent  implements  OnInit{

  forexList: ForexModel[] = [];
  from: ForexModel = {
    name: 'USD',
    code: 'USD',
  };
  to: ForexModel= {
    name: 'JPY',
    code: 'JPY',
  };
  str: string;

  chartData: any[];
  quantity = 1;
  isLoading = false;
  response: any;
  data: {};
  options: any;
  themeSubscription: any;
  colors: any;
  chartjs: any;
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
    this.selectionChanged(null);

  }

  ngOnInit(): void {
    this.initForexList();
  }

  initForexList() {
    this.service.getAllListForex().subscribe( (res: ForexModel[]) => {
      this.forexList = res;
    });
  }


  selectionChanged(event: any) {
    this.isLoading = true;

    forkJoin([
      this.service.loadSingleForexPrice(this.from.code, this.to.code),
      this.service.getAllDailyForex(this.from.code, this.to.code)
    ]).subscribe(res => {
      this.isLoading = false;
      this.response = res[0];

      // @ts-ignore

      const chartvalues = this.getChartData(res[1]);

      this.data = {
        labels: chartvalues.labels,
        datasets: [{
          label: 'Open',
          data: open,
          borderColor: this.colors.primary,
          backgroundColor: this.colors.primary,
          fill: false,
          borderDash: [5, 5],
          pointRadius: 4,
          pointHoverRadius: 10,
        }, {
          label: 'High',
          data: chartvalues.high,
          borderColor: this.colors.dangerLight,
          backgroundColor: this.colors.dangerLight,
          fill: false,
          borderDash: [5, 5],
          pointRadius: 4,
          pointHoverRadius: 10,
        }, {
          label: 'Closed',
          data: chartvalues.close,
          borderColor: this.colors.info,
          backgroundColor: this.colors.info,
          fill: false,
          pointRadius: 4,
          pointHoverRadius: 10,
        }, {
          label: 'Low',
          data: chartvalues.low,
          borderColor: this.colors.success,
          backgroundColor: this.colors.success,
          fill: false,
          pointRadius: 4,
          pointHoverRadius: 10,
        }],
      };

    });


  }

  getChartData(val: DailyForex) {

    const labels = [];
    const open = [];
    const high = [];
    const low = [];
    const close = [];
    val.forexData.forEach( element => {
      labels.push(  new Date(element.dateTime).toDateString() );
      open.push(element.open);
      high.push(element.high);
      low.push(element.low);
      close.push(element.close);

    });

    return {
      labels: labels,
      open: open,
      high: high,
      low: low,
      close,
    };
  }

  getPrice() {
    return (this.response.exchangeRate * this.quantity ).toFixed(3);
  }
}
