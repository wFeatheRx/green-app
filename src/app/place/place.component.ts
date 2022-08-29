import { MaterialModule } from './../material/material.module';
import { NavigationModule } from './../navigation/navigation.module';

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';

import { Location } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';
import { AppService } from '../app.service';

@Component({
  selector: 'app-place',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    NavigationModule,
    OverlayModule,
    RouterModule
  ],
  providers:[AppService],
  templateUrl: './place.component.html',
  styleUrls: ['./place.component.scss']
})
export class PlaceComponent implements OnInit {

  private title:string = '綠創主題';
  constructor( private appService:AppService,private location: Location) { }

  ngOnInit(): void {

    this.appService.upsertTrackCount(this.title);
  }

  public onGoBack(): void {
    this.location.back();
  }
}
