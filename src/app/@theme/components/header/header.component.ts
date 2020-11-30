import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbMediaBreakpointsService, NbMenuService, NbSidebarService, NbThemeService } from '@nebular/theme';

import { UserData } from '../../../@core/data/users';
import { LayoutService } from '../../../@core/utils';
import { map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { AuthenticationService } from '../../../pages/auth/_helpers/authentication.service';
import { FinanceService } from '../../../pages/utils/finance.service';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {

  private destroy$: Subject<void> = new Subject<void>();
  userPictureOnly: boolean = false;
  user: any;

  themes = [
    {
      value: 'default',
      name: 'Light',
    },
    {
      value: 'dark',
      name: 'Dark',
    },
    {
      value: 'cosmic',
      name: 'Cosmic',
    },
    {
      value: 'corporate',
      name: 'Corporate',
    },
  ];

  currentTheme = 'default';

  userMenu = [ { title: 'Profile' }, { title: 'Log out' } ];
  checked: boolean = true;

  constructor(private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private themeService: NbThemeService,
              private userService: UserData,
              private layoutService: LayoutService,
              private breakpointService: NbMediaBreakpointsService,
              private financeService: FinanceService,
              public auth: AuthenticationService) {
    this.financeService.getIndicatorsValue().subscribe(elem => {
      this.checked = elem;
    });
  }
  getUser() {
    if ( this.auth.currentUserValue  ) {
      this.user = {name: this.auth.currentUserValue.username, picture: '' };
    } else {
      this.user = { name: 'Anonymous', picture: 'assets/images/jack.jpg' };
    }
  }
  ngOnInit() {

    this.getUser();

    const { xl } = this.breakpointService.getBreakpointsMap();
    this.themeService.onMediaQueryChange()
      .pipe(
        map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
        takeUntil(this.destroy$),
      )
      .subscribe((isLessThanXl: boolean) => this.userPictureOnly = isLessThanXl);

    this.themeService.onThemeChange()
      .pipe(
        map(({ name }) => name),
        takeUntil(this.destroy$),
      )
      .subscribe(themeName => {
         // this.currentTheme = themeName;
        if( localStorage.getItem('activeTheme')) {
          this.currentTheme = JSON.parse(  localStorage.getItem('activeTheme') );
          this.changeTheme(JSON.parse(  localStorage.getItem('activeTheme')));
        } else {
          this.currentTheme = themeName;
          this.changeTheme(themeName);
        }

      } );
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  changeTheme(themeName: string) {
    this.themeService.changeTheme(themeName);
    localStorage.setItem('activeTheme', JSON.stringify(  themeName));
    console.log('acittttt : ', themeName );

    this.financeService.activeTheme.next(themeName);


  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    this.layoutService.changeLayoutSize();

    return false;
  }

  navigateHome() {
    this.menuService.navigateHome();
    return false;
  }

  setIndicators() {
    this.financeService.setIndicatorsValue(this.checked);
  }
}
