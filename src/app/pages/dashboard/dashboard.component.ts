import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FinanceService } from '../utils/finance.service';
import { GlobalIndicesData } from '../utils/model';

@Component({
  selector: 'ngx-finance-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  followedIndices = ['CAC40', 'NYA', 'COMP', 'SPX', 'RUT', 'NDX', 'JPN'];
  dataToDisplay = "";
  listGlobalIndices: GlobalIndicesData[];
  displayIndicators: boolean;
  constructor(private service: FinanceService) { }

  ngOnInit() {
    this.service.getIndicatorsValue().subscribe((value) => {
      this.displayIndicators = value;
    });


      this.initGlobalIndices();
      setInterval(() => {
        this.initGlobalIndices();
      }, 300000);


  }

  initGlobalIndices() {
    if(!this.displayIndicators) {
      return;
    }
      this.listGlobalIndices = [];
      this.service.getGlobalIndicesData().subscribe( (x: any) => {
        this.listGlobalIndices = x.data;
        this.dataToDisplay = '';
        this.listGlobalIndices.forEach( (value: GlobalIndicesData) => {
          if ( value.netChange < 0 ) {

            this.dataToDisplay += value.companyName + ' <em class="redValue" > ' + value.percentageChange + ' </em> ';
          } else {
            this.dataToDisplay += value.companyName + ' <em class="greenValue" > ' + value.percentageChange + ' </em> ';
          }

          this.dataToDisplay += ' &nbsp&nbsp&nbsp&nbsp&nbsp &nbsp  ';
        } );
      });


  }

  buildUrl() {
    let chart = '';
    let symbol = '';
    this.followedIndices.forEach( (x: string) => {
    chart += 'chartFor=' + x + '&';
    symbol += 'symbol=' + x + '&';
    });
     return chart + symbol;
  }
}
