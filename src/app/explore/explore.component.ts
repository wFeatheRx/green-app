import { NavigationModule } from './../navigation/navigation.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { Router } from '@angular/router';
import { BarcodeFormat } from '@zxing/library';
import { AppService } from '../app.service';

@Component({
  selector: 'app-explore',
  standalone: true,
  imports: [
    CommonModule,
    NavigationModule,
    ZXingScannerModule,
    FlexLayoutModule
  ],
  providers:[AppService],
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss']
})
export class ExploreComponent implements OnInit {

  private title: string = '探索體驗';
  public allowedFormats = [BarcodeFormat.CODE_128, BarcodeFormat.QR_CODE];

  constructor(private appService: AppService, private router: Router, private location: Location) { }

  ngOnInit(): void {

    this.appService.upsertTrackCount(this.title);
  }
  /**
   * 掃描成功
   * @param qrCode
   */
  public onScanSuccess(qrCode: string): void {

    this.router.navigate(['explore', qrCode]);
  }


  public onGoBack(): void {
    this.location.back();
  }


}
