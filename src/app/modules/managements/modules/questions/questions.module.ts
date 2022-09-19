import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainComponent } from './components/main/main.component';
import { QuestionsRouting } from './questions.routing';
import { CoreModule } from 'core/core.module';

@NgModule({
  declarations: [
    MainComponent
  ],
  imports: [
    CommonModule,
    QuestionsRouting,
    CoreModule
  ]
})
export class QuestionsModule { }
