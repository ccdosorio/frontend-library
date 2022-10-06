import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainComponent } from './components/main/main.component';
import { QuestionsRouting } from './questions.routing';
import { CoreModule } from 'core/core.module';
import { SharedModule } from '@shared';
import { QuestionsBookComponent } from './components/questions-book/questions-book.component';

import { PdfViewerModule } from 'ng2-pdf-viewer';

@NgModule({
  declarations: [
    MainComponent,
    QuestionsBookComponent
  ],
  imports: [
    CommonModule,
    QuestionsRouting,
    SharedModule,
    PdfViewerModule,
    CoreModule
  ]
})
export class QuestionsModule { }
