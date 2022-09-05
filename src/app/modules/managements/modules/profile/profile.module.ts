import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainComponent } from './components/main/main.component';
import { ProfileRouting } from './profile.routing';
import { CoreModule } from 'core/core.module';

@NgModule({
  declarations: [
    MainComponent,
  ],
  imports: [
    CommonModule,
    ProfileRouting,
    CoreModule
  ]
})
export class ProfileModule { }
