import { NavigationModule } from './../navigation/navigation.module';
import { Component, OnInit } from '@angular/core';

import { PdfViewerModule } from 'ng2-pdf-viewer';
import { CommonModule,Location } from '@angular/common';
import { AppService } from '../app.service';

@Component({
  selector: 'app-faq',
  standalone: true,
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss'],
  imports: [
    CommonModule,
    PdfViewerModule,
    NavigationModule
  ],
  providers:[AppService],
})
export class FaqComponent implements OnInit {

  public url: string ='';
  public title: string ='常見問題';

  constructor(private appService:AppService,private location: Location) {}

  ngOnInit(): void {

    this.url = `/assets/pdfs/${this.title}.pdf`;
    console.log(`url ${this.url}`);

    this.appService.upsertTrackCount(this.title);
  }

  public onGoBack(): void {
    this.location.back();
  }
}
