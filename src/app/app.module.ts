import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatDialogRef } from '@angular/material/dialog';

import { AppRouting } from './app.routing';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ADMIN_NAVIGATION, APP_CONFIG, FAMILY_NAVIGATION, TEACHER_NAVIGATION } from "@services";
import { appConfig } from "./config";
import { LayoutModule } from './layout/layout.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AdminNavigation, TeacherNavigation, FamilyNavigation } from './navigations';
import { environment } from '../environments/environment';
import { AuthenticationService } from '@services';

// firebase
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { JwtInterceptor } from '@security';

// Syncfusion PdfViewer component from PdfViewer package
import { PdfViewerModule } from '@syncfusion/ej2-angular-pdfviewer';

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
    HttpClientModule,
    PdfViewerModule,
    // firebase
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
  ],
  providers: [
    { provide: MatDialogRef, useValue: {} },
    { provide: APP_CONFIG, useValue: appConfig },
    { provide: ADMIN_NAVIGATION, useValue: AdminNavigation },
    { provide: TEACHER_NAVIGATION, useValue: TeacherNavigation },
    { provide: FAMILY_NAVIGATION, useValue: FamilyNavigation },
    { provide: AuthenticationService, useClass: AuthenticationService },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
