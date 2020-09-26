import { Component, OnInit } from '@angular/core';
import {SelectedTickers, Tickers} from '../../utils/model';
import {FinanceService} from '../../utils/finance.service';
import {Router} from '@angular/router';

@Component({
  selector: 'ngx-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  title = 'finance-client';
  tickersList: Tickers[] = [];
  selectedTickers: SelectedTickers[] = [];

  constructor(private service: FinanceService,
              private router: Router) {  }

  ngOnInit(): void {
    this.getSelectedTickers();
  }
  navigateToInput() {
     this.router.navigateByUrl('/input');
  }

  getSelectedTickers() {
    this.selectedTickers = JSON.parse(localStorage.getItem('selectedItems' )) as SelectedTickers[];
  }







}
