import { NavigationModule } from './../navigation/navigation.module';
import { FlexLayoutModule } from '@angular/flex-layout';

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { AppService } from '../app.service';


@Component({
  selector: 'app-guide',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    NavigationModule,
    PdfViewerModule,
    FlexLayoutModule
  ],
  providers:[AppService],
  templateUrl: './guide.component.html',
  styleUrls: ['./guide.component.scss']
})
export class GuideComponent implements OnInit {

  public url: string = '';
  public title: string = '';


  constructor(private appService:AppService, private activatedRoute: ActivatedRoute, private location: Location) { }

  ngOnInit(): void {

    this.title += this.activatedRoute.snapshot.paramMap.get('title');

    this.url = `/assets/pdfs/${this.title}.pdf`;
    console.log(`url ${this.url}`);

    this.appService.upsertTrackCount(this.title);
  }

  public onGoBack(): void {
    this.location.back();
  }
}

