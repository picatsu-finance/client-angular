import { Component } from '@angular/core';
import { NbCalendarRange, NbDateService } from '@nebular/theme';

@Component({
  selector: 'ngx-extra-product-menu',
  templateUrl: 'extra-product-menu.component.html',
  styleUrls: ['extra-product-menu.component.scss'],
})
export class ExtraProductMenuComponent {

  date = new Date();
  date2 = new Date();
  range: NbCalendarRange<Date>;

  constructor(protected dateService: NbDateService<Date>) {
    this.range = {
      start: this.dateService.addDay(this.monthStart, 3),
      end: this.dateService.addDay(this.monthEnd, -3),
    };
  }

  get monthStart(): Date {
    return this.dateService.getMonthStart(new Date());
  }

  get monthEnd(): Date {
    return this.dateService.getMonthEnd(new Date());
  }
}
