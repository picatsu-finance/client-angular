import { Component, TemplateRef } from '@angular/core';
import { NbDialogService } from '@nebular/theme';

@Component({
  selector: 'ngx-custom-basket-menu',
  templateUrl: 'custom-basket-menu.component.html',
  styleUrls: ['custom-basket-menu.component.scss'],
})
export class CustomBasketMenuComponent {

  names: string[] = [];

  constructor(private dialogService: NbDialogService) {}

  open2(dialog: TemplateRef<any>) {
    this.dialogService.open(
      dialog,
      { context: 'this is some additional data passed to dialog' });
  }

  openWithoutBackdrop(dialog: TemplateRef<any>) {
    this.dialogService.open(
      dialog,
      {
        context: 'this is some additional data passed to dialog',
        hasBackdrop: false,
      });
  }

  openWithoutBackdropClick(dialog: TemplateRef<any>) {
    this.dialogService.open(
      dialog,
      {
        context: 'this is some additional data passed to dialog',
        closeOnBackdropClick: false,
      });
  }

  openWithoutEscClose(dialog: TemplateRef<any>) {
    this.dialogService.open(
      dialog,
      {
        context: 'this is some additional data passed to dialog',
        closeOnEsc: false,
      });
  }
}
