import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {SelectedTickers} from './model';
import {BehaviorSubject, Observable} from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class FinanceService {
  private shouldRefreshTrackedValues: BehaviorSubject<boolean>;

  constructor(private  http: HttpClient) {
    this.shouldRefreshTrackedValues = new BehaviorSubject<boolean>(false);
  }

  // http://94.239.109.172:8003/api/v1/tickers/paginate?page=1&size=10
  getListTickers(page: number, size: number) {
    return this.http.get(environment.apiUrl + '/stock/api/v1/tickers/paginate?page=' + page + '&size=' + size );
  }

  setValue(newValue): void {
    this.shouldRefreshTrackedValues.next(newValue);
  }
  getValue(): Observable<boolean> {
    return this.shouldRefreshTrackedValues.asObservable();
  }
  loadSinglePrince(code: string) {
    return this.http.get( environment.apiUrl + '/stock/api/v1/yahoo/stock/' + code );
  }

  // http://94.239.109.172:8003/api/v1/tickers/search-tickers/AAU
  searchStr(str: string) {
    return this.http.get( environment.apiUrl + '/stock/api/v1/tickers/search-tickers/' + str );
  }


  getSelectedTickers() {
    return JSON.parse(localStorage.getItem('selectedItems' )) as SelectedTickers[];
  }

  setSelectedTickersAndValidate(selectedTickers: SelectedTickers[]) {
    localStorage.setItem('selectedItems', JSON.stringify(selectedTickers));
  }
}
