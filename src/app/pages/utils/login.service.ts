import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})

export class LoginService {


  test() {

    this.http
      .get(environment.apiUrl + '/custom/api/v1/custom/auth/login/' + btoa('m6d@hotmail.fr:achraftest'))
      .subscribe((x: any) => {
      console.log(x);
      const helper = new JwtHelperService();
      const decodedToken = helper.decodeToken(x.access_token);
      const expirationDate = helper.getTokenExpirationDate(x.access_token);
      const isExpired = helper.isTokenExpired(x.access_token);
      console.log('DECODED ==>', decodedToken);
      console.log('expirationDate ==> ', expirationDate);
      console.log('isExpired ==> ', isExpired);
    });
  }

  constructor(private  http: HttpClient) {
  }


  getUserInfos(userName: string, password: string) {
    return this.http
      .get(environment.apiUrl + '/custom/api/v1/custom/auth/login/' + btoa(userName + ':' + password ));
  }
}

