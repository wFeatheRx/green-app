import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LayoutComponent } from './layout/layout.component';
import { NavigationModule } from './navigation/navigation.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SwUpdate, VersionReadyEvent } from '@angular/service-worker';
import { filter, map } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FlexLayoutModule,
    LayoutComponent,
    HomeComponent,
    MatSidenavModule,
    NavigationModule,
    HttpClientModule,
  ]
})
export class AppComponent implements OnInit {
  public isOnline: boolean = false;
  public deferredPrompt: any;
  public showButton = false;

  @HostListener('window:beforeinstallprompt', ['$event']) onBeforeInstallPrompt(event: any) {
    console.log('beforeinstallprompt');
    event.preventDefault();      // 停用 Chrome 67 前的公版提示視窗
    this.deferredPrompt = event; // 記得把事件存起來，後續在安裝的流程上會需要
    this.showButton = true;
  }

  @HostListener('window:online') onOnlineStatus() {
    this.isOnline = window.navigator.onLine;
  }

  @HostListener('window:offline') onOfflineStatus() {
    this.isOnline = window.navigator.onLine;
  }

  constructor(private swUpdate: SwUpdate) {

  }

  /**
   * ngOnInit
   */
  public async ngOnInit(): Promise<void> {

    this.isOnline = window.navigator.onLine;

    if (this.swUpdate.isEnabled) {
      this.checkVersionForUpdates();
    }
  }
  /**
   * checkVersionForUpdates
   * @returns
   */
  private checkVersionForUpdates(): void {
    console.log('step 1');
    this.swUpdate.versionUpdates.pipe(
      filter((x): x is VersionReadyEvent => x.type === 'VERSION_READY'),
      map(x => ({
        currentVersion: x.currentVersion.hash,
        latestVersion: x.latestVersion.hash
      }))
    ).subscribe(async x => {
      console.log(`${x.currentVersion}-->${x.latestVersion}`);

      if (x.currentVersion != x.latestVersion) {
        if (confirm("是否確定更新最新版本?")) {
          await this.swUpdate.activateUpdate();
          location.reload();
        }
      }
    });
  }

  /**
   * 加入主畫面
   */
  public addToHomeScreen() {
    // hide our user interface that shows our A2HS button
    this.showButton = false;
    // Show the prompt
    this.deferredPrompt.prompt();

    // Wait for the user to respond to the prompt
    this.deferredPrompt.userChoice.then((choiceResult: any) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the A2HS prompt');
      } else {
        console.log('User dismissed the A2HS prompt');
      }
      this.deferredPrompt = null;
    });
  }

}
