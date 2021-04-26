import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable()
export class CustomBasketService {
  constructor(private http: HttpClient) {}

  getAllDididendes() {
    return this.http.get(environment.apiUrl + '/earnings/dividendes/stocks/rentabilite');
  }

  getSingleDididendes(societe: string) {
    return this.http.get(environment.apiUrl + `/earnings/dividendes/stock/price/${societe}`);
  }
}
