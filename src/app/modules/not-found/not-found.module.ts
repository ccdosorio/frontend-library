import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotFoundRouting } from './not-found.routing';
import { MainComponent } from './components/main/main.component';


@NgModule({
  declarations: [
    MainComponent
  ],
  imports: [
    CommonModule,
    NotFoundRouting
  ]
})
export class NotFoundModule { }
