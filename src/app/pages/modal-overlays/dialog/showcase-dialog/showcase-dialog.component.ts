import {Component, Input, OnInit} from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import {FinanceService} from '../../../utils/finance.service';
import {SelectedTickers, Tickers} from '../../../utils/model';

@Component({
  selector: 'ngx-showcase-dialog',
  templateUrl: 'showcase-dialog.component.html',
  styleUrls: ['showcase-dialog.component.scss'],
})
export class ShowcaseDialogComponent implements OnInit {

  @Input() value: Tickers;
  @Input() type: string;
  selectedTickers: SelectedTickers[] = [];
  blancSelectedTickers: SelectedTickers;
  constructor(private service: FinanceService,
              protected ref: NbDialogRef<ShowcaseDialogComponent>) {
  }

  dismiss() {
    this.ref.close();
  }

  validate() {
    if(this.selectedTickers === null) {
      this.selectedTickers = [];
    }
    this.selectedTickers.push(... [this.blancSelectedTickers]);
    this.service.setSelectedTickersAndValidate(this.selectedTickers);
    this.service.setValue(true);
    this.ref.close();
  }

  ngOnInit() {
    this.selectedTickers = this.service.getSelectedTickers();
    this.service.loadSinglePrince(this.value.code).subscribe( (x: number) => {
      this.blancSelectedTickers = {
        name: this.value.name,
        code: this.value.code,
        maxThreshold: x,
        minThreshold: x,
        price: x,
        type: this.type,
      };
    });
  }


}
