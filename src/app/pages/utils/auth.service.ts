import { Injectable } from '@angular/core';

import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { Token } from './model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false); // {1}
  private currentUserSubject: BehaviorSubject<Token>;
  public currentUser: Observable<Token>;
  public isLoading = new BehaviorSubject<boolean>(false);

  public get isLoggedIn() {
    if (this.checkIfLogged()) {
      this.loggedIn.next(true);
    } else {
      this.loggedIn.next(false);
    }
    return this.loggedIn.asObservable();
  }

  constructor(private router: Router, private loginService: LoginService, private cookie: CookieService) {
    this.cookie.get('currentUser_finance');
  }

  getisLoading() {
    return this.isLoading.asObservable();
  }

  checkIfLogged() {
    return this.cookie.check('currentUser_finance');
  }

  getActiveUser() {
    return this.currentUser;
  }

  login(userName: string, password: string) {
    this.isLoading.next(true);
    return this.loginService.getUserInfos(userName, password).subscribe((userInfos) => {
      if (!this.checkIfLogged()) {
        this.cookie.set('currentUser_finance', JSON.stringify(userInfos));
        this.loggedIn.next(true);
        this.isLoading.next(false);
        this.router.navigateByUrl('/home');
        // this.toaster.success('Connexion reussie', '', {timeOut: 800});
      } else {
        this.loggedIn.next(false);
        // this.router.navigateByUrl("/login");
        this.isLoading.next(false);
      }
    });
    /*
    if (user.userName == "admin" && user.password == "admin") {
      // {3}
      this.loggedIn.next(true);
      this.router.navigateByUrl("/redirectalog");
    }*/
  }

  logout() {
    // {4}
    this.loggedIn.next(false);
    this.cookie.deleteAll();
    this.router.navigate(['/login']);
    this.currentUserSubject.next(null);
  }
}
