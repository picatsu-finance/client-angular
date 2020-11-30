import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {CryptoPrices, SelectedTickers} from './model';
import {BehaviorSubject, Observable} from 'rxjs';
import { AuthService } from './auth.service';
import { element } from 'protractor';
@Injectable({
  providedIn: 'root',
})
export class FinanceService {
  private indicators: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  public  activeTheme: BehaviorSubject<string> = new BehaviorSubject<string>('dark');
  private optionRequete = {
    headers: new HttpHeaders({
      // 'Access-Control-Allow-Origin': '*',
    }),
  };
  private shouldRefreshTrackedValues: BehaviorSubject<boolean>;

  constructor(private  http: HttpClient,
              private aut: AuthService) {




    if ( localStorage.getItem('indicators') !== null ) {
     this.setIndicatorsValue(  JSON.parse(localStorage.getItem('indicators') )  );
    }
    else {
      this.setIndicatorsValue(true);
    }
    this.shouldRefreshTrackedValues = new BehaviorSubject<boolean>(false);
  }
  getIndicatorsValue(): Observable<boolean> {
    return this.indicators.asObservable();
  }

  setIndicatorsValue(newValue): void {
    localStorage.setItem('indicators', JSON.stringify(newValue));
    this.indicators.next(newValue);
   }

  getGlobalIndicesData() {
    return this.http.get(environment.apiUrl + '/custom/api/v1/custom/indicator/details');
  }

  // http://94.239.109.172:8003/api/v1/tickers/paginate?page=1&size=10
  getListTickers(page: number, size: number) {
    return this.http.get(environment.apiUrl + '/stock/api/v1/tickers/paginate?page=' + page + '&size=' + size,
      this.optionRequete );
  }


  getListCrypto(page: number, size: number) {
    return this.http.get(environment.apiUrl + '/crypto/api/v1/crypto/paginate?page=' + page + '&size=' + size,
      this.optionRequete );
  }

  getListForex(page: number, size: number) {
    return this.http.get(environment.apiUrl + '/forex/api/v1/forex/paginate?page=' + page + '&size=' + size,
      this.optionRequete );
  }

  getAllListForex() {
    return this.http.get(environment.apiUrl + '/forex/api/v1/forex/all',
      this.optionRequete );
  }

  getAllDailyForex(from: string, to: string) {
    return this.http.get( environment.apiUrl + '/forex/api/v1/forex/daily/' + from + '/' + to, this.optionRequete );
  }


  setValue(newValue): void {
    this.shouldRefreshTrackedValues.next(newValue);
  }
  getValue(): Observable<boolean> {
    return this.shouldRefreshTrackedValues.asObservable();
  }
  loadSingleStockPrice(code: string) {
    return this.http.get( environment.apiUrl + '/stock/api/v1/yahoo/stock/' + code, this.optionRequete );
  }
  loadSingleCryptoPrice(code: string, crypto: string) {
    return this.http.get( environment.apiUrl + '/crypto/api/v1/crypto/price/' + code + '/' + crypto, this.optionRequete );
  }
  loadSingleForexPrice(from: string, to: string) {
    return this.http.get( environment.apiUrl + '/forex/api/v1/forex/' + from + '/' + to, this.optionRequete );
  }

  // http://94.239.109.172:8003/api/v1/tickers/search-tickers/AAU
  searchStr(str: string) {
    return this.http.get( environment.apiUrl + '/stock/api/v1/tickers/search-tickers/' + str , this.optionRequete);
  }

  searchCryptoStr(str: string) {
    return this.http.get( environment.apiUrl + '/crypto/api/v1/crypto/search-crypto/' + str , this.optionRequete);
  }

  searchForexStr(str: string) {
    return this.http.get( environment.apiUrl + '/forex/api/v1/forex/search-forex/' + str , this.optionRequete);
  }

  getSelectedTickers() {
    if(this.aut.isLoggedIn && this.aut.currentUser) {
      return null;// TODO HTTP CALL CURRENT USER HERE
    } else {
      if( ! localStorage.getItem('selectedItems' ) )
        return [];
      return JSON.parse(localStorage.getItem('selectedItems' )) as SelectedTickers[];
    }

  }

  setSelectedTickersAndValidate(selectedTickers: SelectedTickers[]) {
    if(this.aut.isLoggedIn && this.aut.currentUser) {
      this.http.post(environment.apiUrl + '/custom/api/v1/custom/selected/create', selectedTickers, this.optionRequete).subscribe(
        res => {
          console.log(res);
        }
      );
      return ;// TODO HTTP CALL CURRENT USER HERE
    } else {
      localStorage.setItem('selectedItems', JSON.stringify(selectedTickers));
    }
  }

  getAllCrypto() {
    return this.http.get( environment.apiUrl + '/crypto/api/v1/crypto/all', this.optionRequete );
  }

  getCryptoDetails(product: string, market: string) {
    return this.http.get( environment.apiUrl + '/crypto/api/v1/crypto/details/' + product +'/' + market ,
      this.optionRequete );
  }


  getMyTickers(userId: string){
    return this.http.get( environment.apiUrl + '/custom/api/v1/custom/selected/' + userId, this.optionRequete);
  }

  getAllStockList() {
    return this.http.get(environment.apiUrl + '/stock/api/v1/tickers/',
      this.optionRequete );
  }

  getStockHistory(code: String) {
    return this.http.get( environment.apiUrl + '/stock/api/v1/yahoo/history/' + code, this.optionRequete);
  }

  postSelectedTicker(selected: SelectedTickers) {
    return this.http.post( environment.apiUrl + '/custom/api/v1/custom/selected/created', {selected}
    , this.optionRequete);
  }


  retrieveSavedValues() {

    this.getSelectedTickers().forEach(x => {
      if ( x.type === 'stock') {
        this.loadSingleStockPrice(x.code).subscribe((value: number) => {
          x.price = value;
        });
      }

      if ( x.type === 'crypto') {
        this.loadSingleCryptoPrice(x.code, 'USD').subscribe((value: CryptoPrices) => {
          x.price = value.quoteResponse.result[0].regularMarketPrice;
        });
      }
    });
  }
}
