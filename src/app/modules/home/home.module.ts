import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRouting } from './home.routing';
import { MainComponent } from './components/main/main.component';
import { CoreModule } from 'core/core.module';



@NgModule({
  declarations: [
    MainComponent
  ],
  imports: [
    CommonModule,
    HomeRouting,
    CoreModule
  ]
})
export class HomeModule { }
