import { Component } from '@angular/core';
import {LoginService} from '../../utils/login.service';



@Component({
  selector: 'ngx-progress-section',
  styleUrls: ['./progress-section.component.scss'],
  templateUrl: './progress-section.component.html',
})
export class ECommerceProgressSectionComponent  {
  constructor(private login: LoginService) {
  }
  test() {
    this.login.test();
  }
}
