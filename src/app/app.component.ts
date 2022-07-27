import { ChangeDetectorRef, Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { Subject, takeUntil } from "rxjs";

import { AppConfig } from "@models";
import { AppConfigService } from "@services";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'frontend-library';

  private subscriptionsSubject: Subject<any>;

  public appConfig: AppConfig = new AppConfig();

  constructor(
    private appConfigService: AppConfigService,
    private changeDetectorRef: ChangeDetectorRef,
    private router: Router
  ) {
    this.subscriptionsSubject = new Subject<any>();
  }


  ngOnInit(): void {
    this.appConfigService.config
      .pipe(takeUntil(this.subscriptionsSubject))
      .subscribe((config: AppConfig) => {
        this.appConfig = config;
        this.changeDetectorRef.detectChanges();
      });

    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0)
    });
  }

  ngOnDestroy(): void {
    this.subscriptionsSubject.next(undefined);
    this.subscriptionsSubject.complete();
  }
}
