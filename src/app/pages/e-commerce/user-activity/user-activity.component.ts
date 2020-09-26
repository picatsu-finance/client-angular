import {Component, OnDestroy, OnInit} from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { takeWhile } from 'rxjs/operators';

import { UserActivityData, UserActive } from '../../../@core/data/user-activity';
import {FinanceService} from '../../utils/finance.service';
import {SelectedTickers, Tickers} from '../../utils/model';

@Component({
  selector: 'ngx-user-activity',
  styleUrls: ['./user-activity.component.scss'],
  templateUrl: './user-activity.component.html',
})
export class ECommerceUserActivityComponent implements OnDestroy, OnInit {

  private alive = true;

  userActivity: UserActive[] = [];
  type = 'month';
  types = ['week', 'month', 'year'];
  currentTheme: string;
  tickersList: Tickers[] = [];
  selectedTickers: SelectedTickers[] = [];
  constructor(private themeService: NbThemeService,
              private service: FinanceService,
              private userActivityService: UserActivityData) {
    this.themeService.getJsTheme()
      .pipe(takeWhile(() => this.alive))
      .subscribe(theme => {
        this.currentTheme = theme.name;
    });

    this.getUserActivity(this.type);
  }

  getSelectedTickers() {
    this.selectedTickers = JSON.parse(localStorage.getItem('selectedItems' )) as SelectedTickers[];
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
    this.getSelectedTickers();
  }
}
