import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotFoundRouting } from './not-found.routing';
import { MainComponent } from './components/main/main.component';
import { CoreModule } from 'core/core.module';


@NgModule({
  declarations: [
    MainComponent
  ],
  imports: [
    CommonModule,
    NotFoundRouting,
    CoreModule
  ]
})
export class NotFoundModule { }
