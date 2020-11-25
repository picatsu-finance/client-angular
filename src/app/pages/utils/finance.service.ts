import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {CryptoPrices, SelectedTickers} from './model';
import {BehaviorSubject, Observable} from 'rxjs';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root',
})
export class FinanceService {

  private optionRequete = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
    }),
  };
  private shouldRefreshTrackedValues: BehaviorSubject<boolean>;

  constructor(private  http: HttpClient,
              private aut: AuthService) {
    this.shouldRefreshTrackedValues = new BehaviorSubject<boolean>(false);
  }

  getGlobalIndicesData() {
    return this.http.get(environment.indicesApiUrl + '/indices?chartFor=COMP&chartFor=NYA&chartFor=SPX&chartFor=RUT' +
      '&chartFor=NDX&symbol=COMP&symbol=NYA&symbol=SPX&symbol=RUT&symbol=NDX&symbol=CAC40',
      this.optionRequete );
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
      return null // TODO HTTP CALL CURRENT USER HERE 
    } else {
      return JSON.parse(localStorage.getItem('selectedItems' )) as SelectedTickers[];
    }
    
  }

  setSelectedTickersAndValidate(selectedTickers: SelectedTickers[]) {
    if(this.aut.isLoggedIn && this.aut.currentUser) {
      return null // TODO HTTP CALL CURRENT USER HERE 
    } else {
      localStorage.setItem('selectedItems', JSON.stringify(selectedTickers));
    }
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
