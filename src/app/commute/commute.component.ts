import { NavigationModule } from './../navigation/navigation.module';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { Component, OnInit } from '@angular/core';
import { CommonModule,Location } from '@angular/common';
import { AppService } from '../app.service';

@Component({
  selector: 'app-commute',
  standalone: true,
  imports: [
    CommonModule,
    NavigationModule,
    PdfViewerModule
  ],
  providers:[AppService],
  templateUrl: './commute.component.html',
  styleUrls: ['./commute.component.scss'],

})
export class CommuteComponent implements OnInit {

  public url: string ='';
  public title: string ='交通資訊';

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
