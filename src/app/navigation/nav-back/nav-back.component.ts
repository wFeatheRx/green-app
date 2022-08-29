import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav-back',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './nav-back.component.html',
  styleUrls: ['./nav-back.component.scss']
})
export class NavBackComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
