import { ChangeDetectorRef, Component } from '@angular/core';
import {NbLoginComponent} from "@nebular/auth";
import { User } from '../../utils/model';
import { AuthenticationService } from '../_helpers/authentication.service';
import { NbAuthService } from '@nebular/auth/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-finance-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent extends NbLoginComponent  {
  user: User;

  constructor(public auth: AuthenticationService,
              public router: Router,
              public cd: ChangeDetectorRef,
              ) {
    super(auth as unknown as NbAuthService , {}, cd, router);

  }

  login() {

    this.auth.login(this.user.email, this.user.password).subscribe(
      user => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        // console.log('receieved value : ', user);
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.auth.currentUserSubject.next(user);
      });

  }

}

