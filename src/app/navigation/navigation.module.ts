import { NavFabMenuComponent } from './nav-fab-menu/nav-fab-menu.component';
import { NavBackComponent } from './nav-back/nav-back.component';

import { NgModule } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { SidenavListComponent } from './sidenav-list/sidenav-list.component';

const navigation = [
  HeaderComponent,
  SidenavListComponent,
  NavBackComponent,
  NavFabMenuComponent
];
@NgModule({
  imports: [navigation],
  exports: [navigation]
})
export class NavigationModule { }
