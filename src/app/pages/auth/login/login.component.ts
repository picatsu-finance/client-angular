import { Component } from '@angular/core';
import {NbLoginComponent} from "@nebular/auth";

@Component({
  selector: 'ngx-finance-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent extends NbLoginComponent  {
}
