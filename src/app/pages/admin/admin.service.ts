import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AdminService {

  private optionRequete = {
   /* headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
    }),*/
  };
  constructor(private  http: HttpClient) {


  }

  /// POST
  postNewForex() {
    return this.http.post(environment.apiUrl + '/forex', {},
      this.optionRequete );
  }

  postNewStock() {
    return this.http.post(environment.apiUrl + '/stock/api/v1/tickers/create', {},
      this.optionRequete );
  }
  postNewCrypto() {
    return this.http.post(environment.apiUrl + '/crypto/api/v1/crypto/create', {},
      this.optionRequete );
  }

  //// DELETE
  deleteTickers(code: any ) {
    return this.http.delete(environment.apiUrl + '/stock/api/v1/tickers/' + code + '/delete');
  }
  deleteCrypto(code: any ) {
    return this.http.delete(environment.apiUrl + '/crypto/api/v1/crypto/' + code + '/delete');
  }


}
