import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatFabMenu,MatFabMenuModule } from '@angular-material-extensions/fab-menu';


@Component({
  selector: 'app-nav-fab-menu',
  standalone: true,
  imports: [CommonModule,MatFabMenuModule],
  templateUrl: './nav-fab-menu.component.html',
  styleUrls: ['./nav-fab-menu.component.scss']
})
export class NavFabMenuComponent {

  public matFabMenuList: MatFabMenu[] = [
    { id: 'place', icon: 'place' },
    { id: 'explore', icon: 'explore' },
    { id: 'register', icon: 'contacts' },
    { id: 'commute', icon: 'commute' },
    { id: 'faq', icon: 'help' },
  ]

  constructor(private router: Router) { }

  /**
   * 選取項目
   * @param event
   */
  public onFabMenuItemSelected(url: string | number) {

    this.router.navigate([url]);

  }
}

