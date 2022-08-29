import { NavigationModule } from './../navigation/navigation.module';

import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../material/material.module';
import { AppService } from '../app.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [
    MaterialModule,
    NavigationModule
  ],
  providers:[AppService]
})
export class HomeComponent implements OnInit {
  private title:string = '首頁';
  constructor(private appService:AppService) { }

  ngOnInit(): void {
    this.appService.upsertTrackCount(this.title);
  }


}
