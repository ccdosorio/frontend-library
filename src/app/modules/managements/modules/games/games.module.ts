import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@shared';
import { MainComponent } from './components/main/main.component';
import { CoreModule } from 'core/core.module';
import { GamesRouting } from './games.routing';


@NgModule({
  declarations: [
    MainComponent
  ],
  imports: [
    CommonModule,
    GamesRouting,
    CoreModule,
    SharedModule,
  ]
})
export class GamesModule { }
