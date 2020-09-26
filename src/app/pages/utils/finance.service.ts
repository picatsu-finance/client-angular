import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class FinanceService {

  constructor(private  http: HttpClient) { }

  // http://94.239.109.172:8003/api/v1/tickers/paginate?page=1&size=10
  getListTickers(page: number, size: number) {
    return this.http.get(environment.apiUrl + '/stock/api/v1/tickers/paginate?page=' + page + '&size=' + size );
  }

  loadSinglePrince(code: string) {
    return this.http.get( environment.apiUrl + '/stock/api/v1/yahoo/stock/' + code );
  }

  // http://94.239.109.172:8003/api/v1/tickers/search-tickers/AAU
  searchStr(str: string) {
    return this.http.get( environment.apiUrl + '/stock/api/v1/tickers/search-tickers/' + str );
  }
}
