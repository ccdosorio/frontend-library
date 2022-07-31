import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainComponent } from './components/main/main.component';
import { IntroRouting } from './intro.routing';
import { CoreModule } from 'core/core.module';

@NgModule({
  declarations: [
    MainComponent
  ],
  imports: [
    CommonModule,
    IntroRouting,
    CoreModule
  ]
})
export class IntroModule { }
