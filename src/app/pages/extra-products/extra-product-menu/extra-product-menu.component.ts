import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'ngx-extra-product-menu',
  templateUrl: 'extra-product-menu.component.html',
  styleUrls: ['extra-product-menu.component.scss'],
})
export class ExtraProductMenuComponent implements OnInit {
  ngOnInit() {
    this.buildMap();
  }

  buildMap() {}
}
