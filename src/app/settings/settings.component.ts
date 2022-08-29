import { NavigationModule } from './../navigation/navigation.module';
import { CommonModule, Location } from '@angular/common';

import { Component } from '@angular/core';
import { AppService } from '../app.service';


@Component({
  selector: 'app-settings',
  standalone: true,
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  imports: [
    CommonModule,
    NavigationModule
  ], providers: [AppService]
})
export class SettingsComponent {
  private title:string = '系統設定';
  constructor(private appService: AppService, private location: Location) { }

  ngOnInit(): void {
    this.appService.upsertTrackCount(this.title);
  }

  public onGoBack(): void {
    this.location.back();
  }
}
