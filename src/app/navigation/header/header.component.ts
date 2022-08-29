import { MatTabsModule } from '@angular/material/tabs';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [
    RouterModule,
    FlexLayoutModule,
    MatListModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatTabsModule
  ]
})
export class HeaderComponent implements OnInit {
  public hostname:string='';
  public sharedHref:string='';
  @Output() public sidenavToggle = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    this.hostname = window.location.hostname;
 
    this.sharedHref=`http://line.naver.jp/R/msg/text/?${this.hostname}`;
  }

  public onToggleSidenav = () => {
    this.sidenavToggle.emit();
  }
}
