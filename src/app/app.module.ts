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
import { environment } from '../environments/environment';
import { AuthenticationService } from '@services';

// firebase
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRouting,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    LayoutModule,
    // firebase
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
  ],
  providers: [
    { provide: APP_CONFIG, useValue: appConfig },
    { provide: ADMIN_NAVIGATION, useValue: AdminNavigation },
    { provide: USER_NAVIGATION, useValue: UserNavigation },
    AuthenticationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
