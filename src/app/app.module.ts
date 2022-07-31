import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRouting } from './app.routing';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ADMIN_NAVIGATION, APP_CONFIG, USER_NAVIGATION } from "@services";
import { appConfig } from "./config";
import { LayoutModule } from './layout/layout.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AdminNavigation, UserNavigation } from './navigations';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRouting,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    LayoutModule
  ],
  providers: [
    { provide: APP_CONFIG, useValue: appConfig },
    { provide: ADMIN_NAVIGATION, useValue: AdminNavigation },
    { provide: USER_NAVIGATION, useValue: UserNavigation },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
